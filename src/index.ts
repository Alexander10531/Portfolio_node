import Express, { Application }  from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./exception/validation-exception";
import { initializateCache } from "./utils/cache-utils";
import { testConnection } from "./utils/prisma-connection";
import { saveLogs } from "./utils/logs-utils";
import logger from "./config/logger"; 
import dotenv from "dotenv"; 
import { mainRouter } from "./routes/router-main";

import crypto from "crypto";

const app : Application = Express(); 
const port = Number(process.env.SERVER_PORT) || 3000; 


const validarFirma = () => {

    const publicKeyBase64 = '9Us6XwKAUPJ9XppgDTQBWdU2Ax/TqTWwQyutaHVyqRo=';
    const requestId = 'e6cc6b91-6faa-4f27-a567-db56f21232da';
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
        null, // Ed25519 no usa hash explícito
        Buffer.from(requestId), // Mensaje
        keyObject,              // Clave pública
        signature               // Firma
      );

      console.log("isValid: ", isValid);

}

validarFirma(); 

dotenv.config(); 
testConnection(); 
initializateCache();

app.use(bodyParser.json());
app.use(mainRouter);
app.use(errorHandler); 
app.use(saveLogs);


app.listen(port, '0.0.0.0', ()=>{
    logger.info("Escuchando en el puerto " +  port); 
})