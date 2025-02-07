"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductService = exports.getProductService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProductService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Trayendo informacion");
    const productQuery = yield prisma.product.findUnique({
        include: {
            category: true,
            state: true
        },
        where: {
            idProduct: Number(req.query.idProducto)
        }
    });
    console.log("Se trajo la informacion");
    return productQuery;
});
exports.getProductService = getProductService;
const createProductService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productoRegistrado = yield prisma.product.create({
        data: {
            nameProduct: req.body.nombreProducto,
            entryDate: new Date(),
            modelProduct: req.body.modeloProducto,
            state: {
                connect: { idState: Number(req.body.idEstado) }
            },
            category: {
                connect: { idCategory: Number(req.body.idCategoria) }
            }
        }
    });
    return productoRegistrado;
});
exports.createProductService = createProductService;
