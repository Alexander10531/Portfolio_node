import { log } from "console";
import CustomException from "../classes/custom-error";
import { NextFunction, Request, Response } from "express"
import { PrismaClient } from "@prisma/client";
import logger from "../config/logger";
import crypto from "crypto";

const expressValidator = require('express-validator');
const prisma = new PrismaClient();

export const generateApiKey = async (req : Request, res : Response, next : NextFunction) => {
    
    logger.info("Creating an API Key subject");
    const errors =  expressValidator.validationResult(req); 
    if(!errors.isEmpty()){
        const customException: CustomException = new CustomException("The request has some problems", 400, errors.array());
        throw customException;
    }

    const keysHistory = prisma.keys_history.create({
        data : {
            linkedEmail : req.body.email,
            apiKey : crypto.randomBytes(32).toString('hex'), 
            publicKey : req.body.publicKey 
        }
    }); 

    keysHistory.then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    }); 

    res.status(200)
    .send({
        "status" : 202,
        "mensaje" : "API Key generado correctamente"
    });

}