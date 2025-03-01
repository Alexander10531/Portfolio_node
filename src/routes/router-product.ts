import { Router } from "express";
import { createProductController, getProductController, productPing } from "../controller/product-controller";
import { createProductValidation, getProductValidation } from "../validation/product-validation";
import { asyncHandler } from "../exception/validation-exception";

const routerProduct : Router = Router(); 

routerProduct.get("/", getProductValidation, asyncHandler(getProductController)); 
routerProduct.post("/", createProductValidation, asyncHandler(createProductController)); 
routerProduct.get("/ping", asyncHandler(productPing));

export default routerProduct; 