import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const expressValidator = require('express-validator');
const prisma = new PrismaClient(); 


export const getProductController = async (req : Request, res : Response) => {

    const errors = expressValidator.validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            message : "Se esta teniendo problemas con la peticion", 
            errors : errors.array()
        });
        return; 
    }

    const productQuery = await prisma.producto.findUnique({
        include :{
            categoria: true,
            estado : true
        },
        where : {
            idProducto : Number(req.query.idProducto)
        }
    }); 

    if(productQuery === null){
        res
            .status(404).json({
            message: "Producto no encontrado",            
        })
        return; 
    }

    res.status(200)
        .json(
            {
                "message": "Lista de productos", 
                "data" : productQuery
            });

}; 
