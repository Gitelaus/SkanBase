import Controller from './../controller';
import Site from './site.object';


export default class SiteController extends Controller {

    constructor(arg){
        super(arg);    
    };


    // Shit goes in the body, yo
    insertSite = (request, response) => {
        if(!request.body.name || !request.body.url) {
            response.send(`Missing params`);
            return;
        }

        let app = this.app;
        
        let db = app.get('database');

        var name = request.body.name;
        var url = request.body.url;

        var site = new Site(name, url);

        var siteModel = app.get('site-model');
        
        siteModel.getSiteDocuments({ name:name }).then((siteObject) => {
            if(siteObject && siteObject.length != 0){
                response.send({
                    error: 'Site by that name already exists'
                });
                return;
            }

            siteModel.insertSiteDocument(site).then((siteObject) => {
                response.send({
                    data: siteObject
                });
            });
        });
    }

    getSites = (request, response) => {
        let app = this.app;
        
        let db = app.get('database');

        let site = {};

        for (var key in request.query) {
            if (!request.query.hasOwnProperty(key)) {
                continue;
            }

            let element = request.query[key]
            
            if(element.startsWith('/') && element.endsWith('/')){
                site[key] = new RegExp(element.substring(1, element.length - 1));
            }else{
                site[key] = element;
            }
         }
        
        var siteModel = app.get('site-model');
        
        siteModel.getSiteDocuments(site).then((siteObject) => {
            if(siteObject){
                response.send({
                    data: siteObject
                });
                return;
            }
        });
    }

}