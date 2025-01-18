import { Router } from "express";
import { createProductController, getProductController } from "../controller/producto-controller";
import { createProductValidation, getProductValidation } from "../validations/product-validation";
import { asyncHandler } from "../exception/validation-exception";

const routerProduct : Router = Router(); 

routerProduct.get("/", getProductValidation, asyncHandler(getProductController)); 
routerProduct.post("/", createProductValidation, createProductController)

export default routerProduct; 