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


const app : Application = Express(); 
const port = 3000; 

testConnection(); 
initializateCache();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  
app.use("/product", routerProduct); 
app.use(errorHandler); 
app.use(saveLogs);

app.listen(port, '0.0.0.0', ()=>{
    logger.info("Escuchando en el puerto " +  port); 
})