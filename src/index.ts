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
import { sendEmail } from "./config/aws";


const app : Application = Express(); 
const port = Number(process.env.SERVER_PORT) || 3000; 

const params: AWS.SES.Types.SendEmailRequest = {
    Source: 'Alextejedda@gmail.com', 
    Destination: {
      ToAddresses: ['AlexanderTejedaBarahona10@gmail.com'], 
    },
    Message: {
      Subject: {
        Data: 'Prueba de AWS SES, esta si es la definitiva'
      },
      Body: {
        Text: {
          Data: 'Este es un mensaje de prueba enviado desde AWS SES.'
        }
      }
    }
};

sendEmail(params).then((data) => {
    logger.info("Email enviado con exito: " + String(data));
}
).catch((error) => {
    logger.error("Error al enviar el email: " + error); 
});

dotenv.config(); 
testConnection(); 
initializateCache();


app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  
app.use("/apiKey", routerSecurity)
app.use("/product", routerProduct); 
app.use(errorHandler); 
app.use(saveLogs);

sendEmail(params).then((data) => {
    logger.info("Email enviado con exito: " + data);
}).catch((error) => {
    logger.error("Error al enviar el email: " + error); 
}); 

app.listen(port, '0.0.0.0', ()=>{
    logger.info("Escuchando en el puerto " +  port); 
})
