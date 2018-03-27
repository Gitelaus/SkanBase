import Controller from './../controller';
import Scan from './scan.model';

export default class ScanController extends Controller {

    constructor(arg){
        super(arg);    
    };

    // Shit goes in the body, yo
    insertScan = (request, response) => {
        if(!request.query.name) {
            response.send(`Missing params`);
            return;
        }

        let app = this.app;
        
        let db = app.get('database');

        var name = request.query.name;

        var scanModel = app.get('scan-model');
        
        scanModel.getScanDocuments({ name:name, status:/[^4]/ }).then((scanObject) => {
            console.log(scanObject);
            if(scanObject && scanObject.length != 0){
                response.send({
                    error: 'A scan for that site is already in process',
                    data: scanObject
                });
                return;
            }

            var scan = new Scan(name);

            scanModel.insertScanDocument(scan).then((scanObject) => {
                response.send({
                    data: scanObject
                });
            });
        });
    }

    scanSite = (request, response) => {
        
    }
}