import Express, { Application }  from "express";
import { Response, Request } from "express";

const app : Application = Express(); 
const port = 3000;


app.get('/prueba', (req : Request, res : Response)=>{
    res.send({
        "mensaje" : "Este es un mensaje de exito"
    })
}); 

app.listen(port, ()=>{
    console.log("Escuchando en el puerto " + port); 
})