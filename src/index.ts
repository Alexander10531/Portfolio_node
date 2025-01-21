import Express, { Application }  from "express";
import routerProduct from "./routes/router-product";
import bodyParser from "body-parser";
import { errorHandler } from "./exception/validation-exception";

const app : Application = Express(); 
const port = 3001; 

app.use(bodyParser.json());
app.use("/producto", routerProduct); 
app.use(errorHandler); 


app.listen(port, ()=>{
    console.log("Escuchando en el puerto:  " + port); 
})