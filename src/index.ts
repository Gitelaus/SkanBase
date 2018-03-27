// Modules Installed
const express = require("express");
const app = express();
const mongodb = require("mongodb");
const bodyParser = require('body-parser');

const fs = require("fs");


// Constants
// TODO: Configurize
const OUT_PORT = 3000;

const DB_HOST = "mongodb://localhost";
const DB_PORT = 27017;
const DB_URL = `${DB_HOST}:${DB_PORT}`;

const mongoClient = mongodb.MongoClient;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// Add new site
// app.post("/site/", (request, response) => {
//     if(!request.body.name || !request.body.url) {
//         response.send(`Missing params`);
//         return;
//     }
    
//     let db = app.get('database');

//     var name = request.body.name;
//     var url = request.body.url;

//     var site = {
//         name: name,
//         url: url
//     }

//     db.collection('sites').insertOne(site, (err, mongoResponse) => {
//         if(err) throw err;
//         console.log('Inserted');
//         response.send({

//         });
//     });
// });

// activate();
loadModules().then(activate);

function activate(){    
    // TODO: modulize this


    // Return list of sites.
    app.get("/site/", app.get('site-controller').getSites);

    app.post("/site", app.get('site-controller').insertSite);

    mongoClient.connect(DB_URL, (err, client) => {
        if(err){
            console.log(err);
            return;
        }
        let db = client.db("skanbase");
        app.set('database', db);

        app.listen(OUT_PORT);
        console.log(`|| Starting Server :${OUT_PORT}`);
    });

}

function loadModules(){
    return new Promise((resolve, reject) => {
        fs.readdir(`${__dirname}/modules`, (err, childInstances) => {
            if(err) throw err;
            
            // Filter out files and grab folders.
            childInstances = childInstances.filter(e => !e.match(/\./));

            childInstances.forEach((module) => {
                var controller = require(`./modules/${module}/${module}.controller.js`).default;
                var model = require(`./modules/${module}/${module}.model.js`).default;
                console.log(controller);
                app.set(`${module}-controller`, new controller(app));
                app.set(`${module}-model`, new model(app));                
            });

            resolve();
        });
    });
}