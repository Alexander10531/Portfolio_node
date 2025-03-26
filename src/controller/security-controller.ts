import { NextFunction, Request, Response } from "express"

export const generateApiKey = async (req : Request, res : Response, next : NextFunction) => {
    
    res.status(200)
    .send({
        "time" : "today", 
        "email" : "Alexander"
    });

}