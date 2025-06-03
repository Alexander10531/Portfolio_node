import Express, { Application }  from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./exception/validation-exception";
import { initializateCache } from "./utils/cache-utils";
import { testConnection } from "./utils/prisma-connection";
import { saveLogs } from "./utils/logs-utils";
import logger from "./config/logger"; 
import dotenv from "dotenv"; 
import { mainRouter } from "./routes/router-main";
import { validarFirma } from "./utils/key-validation";
import cors from "cors";

const app : Application = Express(); 
const port = Number(process.env.SERVER_PORT) || 3000; 


dotenv.config(); 
testConnection(); 
initializateCache();

app.use(cors({
    origin: 'http://localhost:5173',
})); 
app.use(validarFirma); 
app.use(bodyParser.json());
app.use(mainRouter);
app.use(errorHandler); 
app.use(saveLogs);


app.listen(port, '0.0.0.0', ()=>{
    logger.info("Escuchando en el puerto " +  port); 
})