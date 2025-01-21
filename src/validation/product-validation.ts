import CustomValidator from "express-validator";

const expressValidator = require('express-validator');

export const validateState = (value : String) => {
    console.log("Validacion de estado")
    return false; 
}

export const getProductValidation = [
    expressValidator.query('idProducto')
    .isInt({ min : 1 }).withMessage("Field idProducto must be a number")
    .notEmpty().withMessage("Field idProducto must not be empty")
]

export const createProductValidation = [
    expressValidator.body('nombreProducto')
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
        .custom(validateState).withMessage("Value of idState does not exist"), 
        
]

