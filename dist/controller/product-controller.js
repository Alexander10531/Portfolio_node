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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductController = exports.getProductController = void 0;
const custom_error_1 = __importDefault(require("../classes/custom-error"));
const product_services_1 = require("../services/product-services");
const qrcode_1 = __importDefault(require("qrcode"));
const expressValidator = require('express-validator');
const getProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const customException = new custom_error_1.default("The request has some problems", 400, errors.array());
        throw customException;
    }
    let productQuery = yield (0, product_services_1.getProductService)(req, res, next);
    if (productQuery === null) {
        res.status(404).json({
            message: "Producto no encontrado",
        });
        return;
    }
    const qrCodeImage = yield qrcode_1.default.toDataURL(`http:/localhost:8080/producto:idProducto=${productQuery.idProduct}`);
    res.status(200).json({
        "message": "Lista de productos",
        "data": productQuery,
        "productQr": qrCodeImage,
    });
});
exports.getProductController = getProductController;
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = expressValidator.validationResult(req);
    if (!errors.isEmpty()) {
        const customException = new custom_error_1.default("The request has some problems", 400, errors.array());
        throw customException;
    }
    let productoRegistrado = yield (0, product_services_1.createProductService)(req, res);
    res.status(200).json({
        "mensaje": "Producto creado",
        "producto": productoRegistrado
    });
});
exports.createProductController = createProductController;
