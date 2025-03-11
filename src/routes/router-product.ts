import { Router } from "express";
import { createProductController, getProductController, productPing, listProductController } from "../controller/product-controller";
import { createProductValidation, getProductValidation, getListProductsValidation } from "../validation/product-validation";
import { asyncHandler } from "../exception/validation-exception";

const routerProduct : Router = Router(); 

routerProduct.get("/", getProductValidation, asyncHandler(getProductController)); 
routerProduct.get("/getProductList", getListProductsValidation ,asyncHandler(listProductController)); 
routerProduct.get("/ping", asyncHandler(productPing));
routerProduct.post("/", createProductValidation, asyncHandler(createProductController));

export default routerProduct; 