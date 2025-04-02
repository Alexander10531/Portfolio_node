import { Router } from "express";
import routerSecurity from "./router-security";
import routerProduct from "./router-product";
import swaggerUi from 'swagger-ui-express'; 
import swaggerSpec from "../config/swagger-config";

export const mainRouter : Router = Router();

mainRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  
mainRouter.use("/apiKey", routerSecurity)
mainRouter.use("/product", routerProduct); 