import crypto from "crypto";
import { Request } from "express";
import { sendEmail } from "../config/aws";
import { PrismaClient } from "@prisma/client";
import CustomException from "../classes/custom-error";

const prisma : PrismaClient = new PrismaClient();

export const generateApiKeyService = (req : Request) => {

	const apiKey : string = crypto.randomBytes(32).toString('hex');
	
	const keysHistory = prisma.keys_history.create({
		data : {
			linkedEmail : req.body.email,
			apiKey : apiKey, 
			publicKey : req.body.publicKey 
		}
	}); 

	keysHistory.catch((error) => {
		throw new CustomException("Error creating API Key", 500, error);
	})

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
              Data: 'La llave generada es la siguiente: ' + apiKey,
            }
          }
        }
    };

    sendEmail(params).then((data) => {}).catch((error) => {}); 
	return apiKey;

}