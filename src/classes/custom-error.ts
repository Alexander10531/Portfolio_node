import { ValidationErrors } from "../interfaces/interface-errors";

export class CustomException extends Error{

    status! : number; 
    errors! : ValidationErrors[]; 
    
    constructor(message : string, status : number, errors? : ValidationErrors[]){
        super(message); 
        this.status = status;
        if(errors){
            this.errors = errors; 
        }
    }

}

export default CustomException;