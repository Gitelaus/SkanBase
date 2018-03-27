import Model from './../model';

export default class ScanModel extends Model{

    insertScanDocument = (scan) => {
        let app = this.app;

        return new Promise((resolve, reject) => {
            let db = app.get('database');

            db.collection('scan').insertOne(scan, (err, mongoResponse) => {
                if(err) return reject(err);

                resolve(mongoResponse);
            });
        });
    }

    getScanDocuments = (scan) => {
        let app = this.app;
        
        return new Promise((resolve, reject) => {
            let db = app.get('database');

            db.collection('scan').find(scan).toArray((err, mongoResponse) => {
                if(err) reject(err);

                resolve(mongoResponse);
            });
        });
    }
}