import Express, { Application }  from "express";
import bodyParser from "body-parser";

import routerProduct from "./routes/router-product";
import { errorHandler } from "./exception/validation-exception";
import { initializateCache } from "./utils/cache-utils";
import { testConnection } from "./utils/prisma-connection";

const app : Application = Express(); 
const port = 3001; 

initializateCache();

testConnection(); 
app.use(bodyParser.json());
app.use("/product", routerProduct); 
app.use(errorHandler); 


app.listen(port, '0.0.0.0', ()=>{
    console.log("Escuchando en el puerto 2" + port); 
})