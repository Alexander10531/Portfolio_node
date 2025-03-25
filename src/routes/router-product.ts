import { Router } from "express";
import { createProductController, getProductController, productPing, listProductController } from "../controller/product-controller";
import { createProductValidation, getProductValidation, getListProductsValidation } from "../validation/product-validation";
import { asyncHandler } from "../exception/validation-exception";

const routerProduct : Router = Router(); 

/**
 * @swagger
 * /product/getProductList:
 *   get:
 *     summary: Obtiene una lista de productos con paginación
 *     description: Devuelve una lista de productos basada en los parámetros de paginación `page` y `pageSize`.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Número de página.
 *       - in: query
 *         name: pageSize
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Cantidad de productos por página.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Mensaje:
 *                   type: string
 *                   example: "Se extrajo la informacion de manera correcta."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idProduct:
 *                         type: integer
 *                         example: 1
 *                       nameProduct:
 *                         type: string
 *                         example: "Sony"
 *                       entryDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-16T00:00:00.000Z"
 *                       modelProduct:
 *                         type: string
 *                         example: "Bravia"
 *                       idCategory:
 *                         type: integer
 *                         example: 1
 *                       idState:
 *                         type: integer
 *                         example: 1
 *                 count:
 *                   type: integer
 *                   example: 1
 */
routerProduct.get("/getProductList", getListProductsValidation ,asyncHandler(listProductController)); 
/**
 * @swagger
 * /product/ping:
 *   get:
 *     summary: Verifica la conectividad del servicio
 *     description: Retorna un mensaje de confirmación si el servicio está activo.
 *     responses:
 *       200:
 *         description: Respuesta exitosa indicando que el servicio está activo.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Mensaje:
 *                   type: string
 *                   example: "El servicio está en línea."
 */
routerProduct.get("/ping", asyncHandler(productPing));

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Obtiene información de un producto por su ID
 *     description: Devuelve los detalles de un producto específico según su ID.
 *     parameters:
 *       - in: query
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID del producto a consultar.
 *     responses:
 *       200:
 *         description: Información del producto obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Mensaje:
 *                   type: string
 *                   example: "Producto encontrado."
 *                 data:
 *                   type: object
 *                   properties:
 *                     idProduct:
 *                       type: integer
 *                       example: 1
 *                     nameProduct:
 *                       type: string
 *                       example: "Sony"
 *                     entryDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-16T00:00:00.000Z"
 *                     modelProduct:
 *                       type: string
 *                       example: "Bravia"
 *                     idCategory:
 *                       type: integer
 *                       example: 1
 *                     idState:
 *                       type: integer
 *                       example: 1
 */
routerProduct.get("/", getProductValidation, asyncHandler(getProductController)); 

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Crea un nuevo producto
 *     description: Registra un nuevo producto en la base de datos con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreProducto:
 *                 type: string
 *                 example: "LG"
 *               modeloProducto:
 *                 type: string
 *                 example: "prueba"
 *               idCategoria:
 *                 type: integer
 *                 example: 1
 *               idEstado:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Producto creado"
 *                 producto:
 *                   type: object
 *                   properties:
 *                     idProduct:
 *                       type: integer
 *                       example: 7
 *                     nameProduct:
 *                       type: string
 *                       example: "LG"
 *                     entryDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-03-25T00:00:00.000Z"
 *                     modelProduct:
 *                       type: string
 *                       example: "prueba"
 *                     idCategory:
 *                       type: integer
 *                       example: 1
 *                     idState:
 *                       type: integer
 *                       example: 1
 */
routerProduct.post("/", createProductValidation, asyncHandler(createProductController));

export default routerProduct; 