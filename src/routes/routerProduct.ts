import { Router } from "express";
import { getProduct } from "../controller/productoController";

const routerProduct : Router = Router(); 

routerProduct.get("/", getProduct); 

export default routerProduct; 