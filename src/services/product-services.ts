import { PrismaClient, Product } from "@prisma/client";
import { Response, Request, NextFunction } from "express";

const prisma = new PrismaClient();

export const getProductService = async (req : Request, res : Response, next : NextFunction) => {

    console.log("Trayendo informacion"); 
    const productQuery = await prisma.product.findUnique({
        include :{
            category: true,
            state : true
        },
        where : {
            idProduct : Number(req.query.idProducto)
        }
    }); 

    console.log("Se trajo la informacion"); 
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
