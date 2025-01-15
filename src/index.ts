import Express, { Application }  from "express";
import routerProduct from "./routes/routerProduct";

const app : Application = Express(); 
const port = 3001;

app.use("/producto", routerProduct); 

app.use((req, res, next) => {
    res.status(404).
        json(
            {
                error : -2, 
                descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`
            })
}); 

app.listen(port, ()=>{
    console.log("Escuchando en el puerto " + port); 
})