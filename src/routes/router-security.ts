import { Router } from "express";
import { asyncHandler } from "../exception/validation-exception";
import { generateApiKey } from "../controller/security-controller";
import { apiKeyValidation } from "../validation/security-validation";

const routerSecurity : Router = Router(); 

routerSecurity.post('/create-api', apiKeyValidation ,asyncHandler(generateApiKey)); 

export default routerSecurity;  