import Express, { Application }  from "express";
import routerProduct from "./routes/routerProduct";
import bodyParser from "body-parser";

const app : Application = Express(); 
const port = 3001; 

//Middleware
app.use(bodyParser.json());
app.use("/producto", routerProduct); 

app.listen(port, ()=>{
    console.log("Escuchando en el puerto:  " + port); 
})