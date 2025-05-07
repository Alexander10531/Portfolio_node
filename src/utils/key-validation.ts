import crypto from "crypto";
import { NextFunction, Request, Response } from "express";

export const validarFirma = (req : Request, res : Response, next : NextFunction) => {

    console.log("----------------"); 
    console.log(req.headers['public-key']);
    const publicKeyBase64 = '9Us6XwKAUPJ9XppgDTQBWdU2Ax/TqTWwQyutaHVyqRo=';
    const requestId = 'e6cc6b91-6faa-4f27-a567-db55f21232da';
    const signatureBase64 = 'koDxk0ZWQyzFdStMF8nnPl30mzCKSAlVIuBhWt/ezmueWUo67DCHp44SYJhzHP1rc7EEDX4d+PtuGb0YDEKoAw==';

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

      const isValid = crypto.verify(
        null, 
        Buffer.from(requestId), 
        keyObject,
        signature
      );

      console.log("isValid: ", isValid);
      next(); 

}