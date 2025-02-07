"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_product_1 = __importDefault(require("./routes/router-product"));
const validation_exception_1 = require("./exception/validation-exception");
const cache_utils_1 = require("./utils/cache-utils");
const prisma_connection_1 = require("./utils/prisma-connection");
const app = (0, express_1.default)();
const port = 3001;
(0, cache_utils_1.initializateCache)();
(0, prisma_connection_1.testConnection)();
app.use(body_parser_1.default.json());
app.use("/producto", router_product_1.default);
app.use(validation_exception_1.errorHandler);
app.listen(port, () => {
    console.log("Escuchando en el puerto!!!!!  " + port);
});
