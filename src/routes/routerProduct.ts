import { Router } from "express";
import { createProductController, getProductController } from "../controller/productoController";

const routerProduct : Router = Router(); 
const expressValidator = require('express-validator');

routerProduct.get(
    "/", 
    [expressValidator.query('idProducto')
        .isNumeric()
        .notEmpty()],
    getProductController); 

routerProduct.post("",
    [expressValidator.body('nombreProducto')
        .isString()
        .notEmpty()],
    createProductController)

export default routerProduct; 