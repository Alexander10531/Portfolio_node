import { NextFunction, Request, Response } from "express";
import CustomException from "../classes/custom-error";
import { ResponseErrorValidation } from "../interfaces/interface-errors";

export interface CustomError extends Error {

    statusCode? : number, 
    message : string

}

export const errorHandler = (errors : CustomException, req : Request, res : Response, next : NextFunction) => {
   
    if(!errors.status){
        return; 
    }
    
    const statusCode = errors.status || 500;
    const message = errors.message || 'Internal Server Error';
    let responseError : ResponseErrorValidation[] = []; 
    
    for (let error of errors.errors) {
        responseError.push({
            message: error.msg, 
            field : error.path, 
        }); 
    }

    res.status(statusCode).json({
        success : false, 
        message,
        responseError 
    })
    next(); 

}; 

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };