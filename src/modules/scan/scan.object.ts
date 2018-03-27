export default class Scan{

    timestamp : number;
    site_name : string;
    status : number;
    constructor(site_name : string, timestamp? : number, status? : number){
        this.site_name = site_name;
        this.timestamp = timestamp || (new Date).getTime();
        this.status = status || 0;
    }
}