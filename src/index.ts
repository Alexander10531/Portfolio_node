import Express, { Application }  from "express";
import bodyParser from "body-parser";
import routerProduct from "./routes/router-product";
import { errorHandler } from "./exception/validation-exception";
import { initializateCache } from "./utils/cache-utils";
import { testConnection } from "./utils/prisma-connection";
import { saveLogs } from "./utils/logs-utils";
import logger from "./config/logger"; 
import swaggerUi from 'swagger-ui-express'; 
import swaggerSpec from "./config/swagger-config";
import routerSecurity from "./routes/router-security";
import dotenv from "dotenv"; 
import { sendEmail } from "./config/email-configuration";


const app : Application = Express(); 
const port = Number(process.env.SERVER_PORT) || 3000; 

dotenv.config(); 
testConnection(); 
initializateCache();

const envioDeCorreo = () => {

    sendEmail({
        to : "AlexanderTejedaBarahona10@gmail.com",
        subject : "Prueba con typescript", 
        text : "Hola, esta es una prueba para envio de email" 
    }).then(() => console.log("Se envio el correo"))
    .catch((error) => console.error("Error al enviar el correo", error))

}

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  
app.use("/apiKey", routerSecurity)
app.use("/product", routerProduct); 
app.use(errorHandler); 
app.use(saveLogs);
envioDeCorreo(); 

app.listen(port, '0.0.0.0', ()=>{
    logger.info("Escuchando en el puerto " +  port); 
})
