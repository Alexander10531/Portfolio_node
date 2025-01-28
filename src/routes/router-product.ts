import { Router } from "express";
import { createProductController, getProductController } from "../controller/product-controller";
import { createProductValidation, getProductValidation } from "../validation/product-validation";
import { asyncHandler } from "../exception/validation-exception";

const routerProduct : Router = Router(); 

routerProduct.get("/", getProductValidation, asyncHandler(getProductController)); 
routerProduct.post("/", createProductValidation, asyncHandler(createProductController)); 

export default routerProduct; 