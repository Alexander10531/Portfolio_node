import { NextFunction, Request, Response } from "express";

export interface CustomError extends Error {

    statusCode? : number, 
    message : string

}

export const errorHandler = (err : CustomError, req : Request, res : Response, next : NextFunction) => {
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success : false, 
        message, 

    })

}; 

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };