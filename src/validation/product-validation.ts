import { State } from "@prisma/client";
import { cacheState } from "../utils/cache-utils";
import CustomException from "../classes/custom-error";

const expressValidator = require('express-validator');

export const validateState = async (value : number) => {

    let states = await cacheState.get("states"); 
    states.then((states : State[]) => {

        console.log(states); 
        let idEstados = states.map((state : State) => state.idState); 
        if(idEstados.includes(Number(value))){
            return true;
        }else{
            throw new CustomException("Value of idState does not exist", 400);
        }

    })

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
        .isInt({ min : 1 })
        .notEmpty().withMessage("Field idCategoria must not be empty"), 
    expressValidator.body("modeloProducto")
        .isString().withMessage("Field modeloProducto must be a string")
        .notEmpty().withMessage("Field modeloProducto must not be empty"),
    expressValidator.body("idEstado")
        .isInt({ min : 1 }).withMessage("Field idEstado must be greater than 1")
        .notEmpty().withMessage("Field idEstado must not be empty")
        .custom(validateState).withMessage("Value of idState does not exist")
]

export const getListProductsValidation = [

    expressValidator.query('page')
    .isInt({min : 1}).withMessage("Param idPage must be greater than 0")
    .notEmpty().withMessage("Field page must not be empty"), 
    expressValidator.query('pageSize')
    .isInt({min : 1}).withMessage("Param pageSize must be greater than 0")
    .notEmpty().withMessage("Field page must not be empty"), 

]