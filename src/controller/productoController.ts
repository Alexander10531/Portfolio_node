import { Response, Request } from "express";
export const getProduct = ((req : Request, res : Response) => {

    console.log("Se obtiene la lista de productos");
    res
        .status(200)
        .json(
            {message: "Lista de productos"});

})