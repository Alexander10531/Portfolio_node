import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import logger from "../config/logger";

const prisma = new PrismaClient();

export const getProductService = async (req : Request, res : Response, next : NextFunction) => {

    const productQuery = await prisma.product.findUnique({
        include :{
            category: true,
            state : true
        },
        where : {
            idProduct : Number(req.query.idProducto)
        }
    }); 

    return productQuery; 

}

export const createProductService = async (req : Request, res : Response) => {

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

    return productoRegistrado; 

}

export const listProductsService = async (req : Request, res : Response) => {

    const { page, pageSize } = req.query; 
    let pagePagination : number = Number(page) == 0 ? 0 : Number(page) - 1;  
    let pageSizePagination : number = Number(pageSize);  
    
    const skip : number = (pagePagination) * pageSizePagination; 
    const productosRegistrados = await prisma.product; 

    const [dataProducts, count] = await prisma.$transaction([
        prisma.product.findMany({
            skip, 
            take: pageSizePagination, 
            orderBy: {
                idProduct : 'asc', 
            }
        }), 
        prisma.product.count(), 
    ])
    
    return [count, dataProducts, dataProducts.length]; 

}