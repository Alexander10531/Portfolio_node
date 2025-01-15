import { Router } from "express";
import { getProductController } from "../controller/productoController";

const routerProduct : Router = Router(); 

routerProduct.get("/", getProductController); 

export default routerProduct; 