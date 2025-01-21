import { PrismaClient } from "@prisma/client";
import CustomException  from "../classes/custom-error";
import { Response, Request, NextFunction } from "express";

const expressValidator = require('express-validator');
const prisma = new PrismaClient(); 

export const getProductController = async (req : Request, res : Response, next : NextFunction) => {

    const errors = expressValidator.validationResult(req);
    if(!errors.isEmpty()){
        const customException: CustomException = new CustomException("The request has some problems", 400, errors.array());
        throw customException; 
    }

    const productQuery = await prisma.product.findUnique({
        include :{
            category: true,
            state : true
        },
        where : {
            idProduct : Number(req.query.idProducto)
        }
    }); 

    if(productQuery === null){
        res.status(404).json({
            message: "Producto no encontrado",            
        })
        return; 
    }

    res.status(200).json(
            {
                "message": "Lista de productos", 
                "data" : productQuery
            });

}; 

export const createProductController = async (req : Request, res : Response) => {

    const errors = expressValidator.validationResult(req);
    if(!errors.isEmpty()){
        const customException: CustomException = new CustomException("The request has some problems", 400, errors.array());
        throw customException; 
    }

    const productoRegistrado = await prisma.product.create({
        data : {
            nameProduct : req.body.nombreProducto,
            entryDate: new Date(),
            modelProduct: req.body.modeloProducto,
            state: {
                connect: { idState: Number(req.body.idEstado) }
            },
            category: {
                connect: { idCategory: Number(req.body.idCategoria) }
            }
        }
    }); 
    
    res.status(200).json({
        "mensaje" : "Producto creado", 
        "producto" : productoRegistrado
    });        

}