export interface ValidationErrors{

    type: string; 
    value: string; 
    msg: string; 
    path: string; 
    location: string;

}

export interface ResponseErrorValidation {

    message : string; 
    field : string; 

}
