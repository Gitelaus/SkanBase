export default class Controller {
    
    app;
    constructor(app){
        this.app = app;    
    }

    formatResponse = (data, errors? : Array<object>) => {
        return {
            data:data,
            errors:errors
        }
    }

    retrieveError = (identifier, params? : Array<string>) => {

    }
}