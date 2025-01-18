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
        .isString().withMessage("Field nombreProducto must be a string")
        .notEmpty().withMessage("Field nombreProducto must not be empty"), 
    expressValidator.body('idCategoria')
        .isInt({ min : 1})
        .notEmpty().withMessage("Field idCategoria must not be empty"), 
    expressValidator.body("modeloProducto")
        .isString().withMessage("Field modeloProducto must be a string")
        .notEmpty().withMessage("Field modeloProducto must not be empty"),
    expressValidator.body("idEstado")
        .isInt({ min : 1}).withMessage("Field idEstado must be greater than 1")
        .notEmpty().withMessage("Field idEstado must not be empty")
    ], createProductController)

export default routerProduct; 