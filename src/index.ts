import Express, { Application }  from "express";
import routerProduct from "./routes/routerProduct";

const app : Application = Express(); 
const port = 3001;

//Middleware
app.use("/producto", routerProduct); 

app.listen(port, ()=>{
    console.log("Escuchando en el puerto:  " + port); 
})