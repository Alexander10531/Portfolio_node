import CustomException  from "../classes/custom-error";
import { Response, Request, NextFunction } from "express";
import { createProductService, getProductService, listProductsService } from "../services/product-services";
import QRCode from 'qrcode';
import logger from "../config/logger";

const expressValidator = require('express-validator');

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

    const qrCodeImage = await QRCode.toDataURL(`http:/localhost:8080/producto:idProducto=${ productQuery.idProduct }`);  
    res.status(200).json(
            {
                "message": "Lista de productos", 
                "data" : productQuery, 
                "productQr" : qrCodeImage, 
            });
    next(); 

}; 

export const createProductController = async (req : Request, res : Response, next : NextFunction) => {

    logger.info("We're extracting products informations")
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
    next(); 

}

export const listProductController = async (req : Request, res : Response, next : NextFunction) => {
    
    const errors = expressValidator.validationResult(req);
    if(!errors.isEmpty()){
        const customException: CustomException = new CustomException("The request has some problems", 400, errors.array());
        throw customException; 
    }


    let [count, dataProducts, dataProductsSize] = await listProductsService(req, res); 
    
    res.status(200)
        .json({
            "Mensaje" : "Se extrajo la informacion de manera correcta.", 
            "data" : dataProducts,
            "count":  count, 
            lastPage : Math.floor(Number(count) / Number(dataProductsSize)) > Number(req.query.page),
        }); 
    next(); 

}

export const productPing = async (req : Request, res : Response, next : NextFunction) => {

    logger.info("Servicio hacer ping"); 
    res.status(200).json({
        "message" : "Ping de productos"
    });
    next(); 

}