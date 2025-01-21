import { PrismaClient } from "@prisma/client";
import CustomException  from "../classes/custom-error";
import { Response, Request, NextFunction } from "express";
import { createProductService, getProductService } from "../services/product-services";

const expressValidator = require('express-validator');
const prisma = new PrismaClient(); 

export const getProductController = async (req : Request, res : Response, next : NextFunction) => {

    const errors = expressValidator.validationResult(req);
    if(!errors.isEmpty()){
        const customException: CustomException = new CustomException("The request has some problems", 400, errors.array());
        throw customException; 
    }

    let productQuery = await getProductService(req, res, next);

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
    
    let productoRegistrado = await createProductService(req, res);

    res.status(200).json({
        "mensaje" : "Producto creado", 
        "producto" : productoRegistrado
    });        

}