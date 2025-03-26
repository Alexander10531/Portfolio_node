import { NextFunction, Router } from "express";
import { asyncHandler } from "../exception/validation-exception";
import { generateApiKey } from "../controller/security-controller";

const routerSecurity : Router = Router(); 

routerSecurity.post('/create-api', asyncHandler(generateApiKey)); 

export default routerSecurity;  