import Express, { Application }  from "express";
import bodyParser from "body-parser";
import routerProduct from "./routes/router-product";
import { errorHandler } from "./exception/validation-exception";
import { initializateCache } from "./utils/cache-utils";
import { testConnection } from "./utils/prisma-connection";
import { saveLogs } from "./utils/logs-utils";
import logger from "./config/logger"; 

const app : Application = Express(); 
const port = 3001; 

testConnection(); 
initializateCache();

app.use(bodyParser.json());
app.use("/product", routerProduct); 
app.use(errorHandler); 
app.use(saveLogs); 


app.listen(port, '0.0.0.0', ()=>{
    logger.info("Escuchando en el puerto " +  port); 
})