import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import CustomException from "../classes/custom-error";

const prisma = new PrismaClient();

export const validarFirma = (req: Request, res: Response, next: NextFunction) => {

    const publicKeyBase64: String = String(req.headers['public-key']);
    const requestId: String = String(req.headers['request-id']);
    const signatureBase64: String = String(req.headers['signature']);
    let isValid: boolean = true;

    try{
    
        const rawPublicKey = Buffer.from(publicKeyBase64, 'base64');
        const signature = Buffer.from(signatureBase64, 'base64');
    
        const spkiPrefix = Buffer.from([
            0x30, 0x2a,
            0x30, 0x05,
            0x06, 0x03, 0x2b, 0x65, 0x70,
            0x03, 0x21, 0x00
        ]);
    
        const spkiKey = Buffer.concat([spkiPrefix, rawPublicKey]);
    
        const keyObject = crypto.createPublicKey({
            key: spkiKey,
            format: 'der',
            type: 'spki',
        });
    
        isValid = crypto.verify(
            null,
            Buffer.from(requestId),
            keyObject,
            signature
        );

        if(!isValid){
            isValid = false;
        }
        next();
    }catch(e){
        if(!!(publicKeyBase64 || requestId || signatureBase64)){
            throw new CustomException("No se estan enviando los headers necesarios", 200, []);
        }
        throw new CustomException("Se genero un error no controlado al validar la firma", 200, []);
    }

    if(!isValid){
        throw new CustomException("Credenciales no validas", 200, []);
    }


}