export default class Site {


    /*
    * name: -
    *       Describes the human friendly name of the site, this is also the identifier.
    * url:  -
    *       Describes the base URL of which the scanner will start from and expand outwards.
    */
    name : string;
    url : string;
    constructor(name : string, url : string){
        this.name = name;
        this.url = url;
    }
}