import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 

export const getProductController = async (req : Request, res : Response) => {

    const productQuery = await prisma.producto.findUnique({
        where: {
            idProducto: 3, 
        }, 
    }); 

    console.log(productQuery); 
    if(productQuery != null){
        console.log(productQuery!.nombreProducto);
        console.log(productQuery.fechaIngreso);
    }

    res.status(200)
        .json(
            {message: "Lista de productos"});

}; 