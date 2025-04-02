import { NextFunction, Request, Response } from "express"
import CustomException from "../classes/custom-error";
import { send } from "process";
import { sendEmail } from "../config/aws";

const expressValidator = require('express-validator');

export const generateApiKey = async (req : Request, res : Response, next : NextFunction) => {

    const errors =  expressValidator.validationResult(req); 
    if(!errors.isEmpty()){
        const customException: CustomException = new CustomException("The request has some problems", 400, errors.array());
        throw customException;
    }

    const params: AWS.SES.Types.SendEmailRequest = {
        Source: process.env.email_destintation!, 
        Destination: {
          ToAddresses: [req.body.email], 
        },
        Message: {
          Subject: {
            Data: 'Esta es una prueba'
          },
          Body: {
            Text: {
              Data: 'Este es un mensaje de prueba enviado desde AWS SES.'
            }
          }
        }
    };

    sendEmail(params).then((data) => {}).catch((error) => {}); 

    res.status(200)
    .send({
        "mensaje" : "API Key generado correctamente"
    });

}