import Model from './../model';

export default class SiteModel extends Model{

    insertSiteDocument = (site) => {
        let app = this.app;

        return new Promise((resolve, reject) => {
            let db = app.get('database');

            db.collection('sites').insertOne(site, (err, mongoResponse) => {
                if(err) return reject(err);

                resolve(mongoResponse);
            });
        });
    }

    getSiteDocuments = (site) => {
        let app = this.app;
        
        return new Promise((resolve, reject) => {
            let db = app.get('database');

            db.collection('sites').find(site).toArray((err, mongoResponse) => {
                if(err) return reject(err);
                console.log(err);
                
                resolve(mongoResponse);
            });
        });
    }
}