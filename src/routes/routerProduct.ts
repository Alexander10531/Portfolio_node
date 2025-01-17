import { Router } from "express";
import { getProductController } from "../controller/productoController";

const routerProduct : Router = Router(); 
const expressValidator = require('express-validator');

routerProduct.get(
    "/", 
    [expressValidator.query('idProducto')
        .isNumeric()
        .notEmpty()
        .withMessage('The "name" query parameter is required.')],
    getProductController); 

export default routerProduct; 