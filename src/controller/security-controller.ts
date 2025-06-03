import logger from "../config/logger";
import { PrismaClient } from "@prisma/client";
import CustomException from "../classes/custom-error";
import { NextFunction, Request, Response } from "express"
import { generateApiKeyService } from "../services/apiKye-services";


const expressValidator = require('express-validator');

export const generateApiKey = async (req : Request, res : Response, next : NextFunction) => {
    
    logger.info("Creating an API Key subject");
    const errors =  expressValidator.validationResult(req); 
    if(!errors.isEmpty()){
        const customException: CustomException = new CustomException("The request has some problems", 400, errors.array());
        throw customException;
    }

    let apiKey = generateApiKeyService(req); 

    res.status(200)
    .send({
        "status" : 202,
        "mensaje" : "API Key generado correctamente", 
        "apiKey" : apiKey,
    });

}