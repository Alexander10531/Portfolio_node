import { Router } from "express";
import { asyncHandler } from "../exception/validation-exception";
import { generateApiKey } from "../controller/security-controller";
import { apiKeyValidation } from "../validation/security-validation";

const routerSecurity : Router = Router(); 

/**
 * @swagger
 * /apiKey/create-api:
 *   post:
 *     summary: Crear API Key
 *     description: Crea una nueva API Key a partir del correo y la clave pública proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: AlexanderTejedaBarahona10@gmail.com
 *               publicKey:
 *                 type: string
 *                 example: asdlañsldm
 *             required:
 *               - email
 *               - publicKey
 *     responses:
 *       200:
 *         description: API Key creada exitosamente.
 *       400:
 *         description: Solicitud inválida.
 */
routerSecurity.post('/create-api', apiKeyValidation ,asyncHandler(generateApiKey)); 

export default routerSecurity;  