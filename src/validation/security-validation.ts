import { PrismaClient } from "@prisma/client";
import CustomException from "../classes/custom-error";

const expressValidator = require('express-validator');

const prismaClient = new PrismaClient();

async function validateEmail(value: string) {

    try {
        
        const existUser = await prismaClient.keys_history.findFirst({
            where: {
                linkedEmail: value,
            }
        })
    
    
        if (existUser) {
            throw new CustomException("Email is in use already", 400, []);
        }
        return true;

    } catch (error) {
        if(error instanceof CustomException) {
            throw error; 
        }
    }

}

export const apiKeyValidation = [

    expressValidator.body("email")
        .isEmail().withMessage("Field email must be a valid email")
        .notEmpty().withMessage("Field email must not be empty")
        .custom(validateEmail),
    expressValidator.body("publicKey")
        .notEmpty().withMessage("Field publicKey must not be empty")
]