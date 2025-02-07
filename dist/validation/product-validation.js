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
exports.createProductValidation = exports.getProductValidation = exports.validateState = void 0;
const cache_utils_1 = require("../utils/cache-utils");
const custom_error_1 = __importDefault(require("../classes/custom-error"));
const expressValidator = require('express-validator');
const NodeCache = require('node-cache');
const validateState = (value) => __awaiter(void 0, void 0, void 0, function* () {
    let states = cache_utils_1.cacheState.get("states");
    yield states.then((states) => {
        let idEstados = states.map((state) => state.idState);
        if (idEstados.includes(value)) {
            return true;
        }
        else {
            throw new custom_error_1.default("Value of idState does not exist", 400);
        }
    });
});
exports.validateState = validateState;
exports.getProductValidation = [
    expressValidator.query('idProducto')
        .isInt({ min: 1 }).withMessage("Field idProducto must be a number")
        .notEmpty().withMessage("Field idProducto must not be empty")
];
exports.createProductValidation = [
    expressValidator.body('nombreProducto')
        .isString().withMessage("Field nombreProducto must be a string")
        .notEmpty().withMessage("Field nombreProducto must not be empty"),
    expressValidator.body('idCategoria')
        .isInt({ min: 1 })
        .notEmpty().withMessage("Field idCategoria must not be empty"),
    expressValidator.body("modeloProducto")
        .isString().withMessage("Field modeloProducto must be a string")
        .notEmpty().withMessage("Field modeloProducto must not be empty"),
    expressValidator.body("idEstado")
        .isInt({ min: 1 }).withMessage("Field idEstado must be greater than 1")
        .notEmpty().withMessage("Field idEstado must not be empty")
        .custom(exports.validateState).withMessage("Value of idState does not exist")
];
