import { NextFunction, Request, Response } from "express";
import { sendEmail } from "../config/aws";
import { PrismaClient } from "@prisma/client";

const prisma : PrismaClient = new PrismaClient();

export const generateApiKey = async (req : Request, res : Response, next : NextFunction) => {

    

    const params: AWS.SES.Types.SendEmailRequest = {
        Source: process.env.email_destintation!, 
        Destination: {
          ToAddresses: [req.body!.email], 
        },
        Message: {
          Subject: {
            Data: 'Generacion de API KEY para sistema de inventario', 
          },
          Body: {
            Text: {
              Data: 'La llave generada es la siguiente: 123'
            }
          }
        }
    };

    sendEmail(params).then((data) => {}).catch((error) => {}); 


}