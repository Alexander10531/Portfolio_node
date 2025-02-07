"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = void 0;
const errorHandler = (errors, req, res, next) => {
    if (!errors.status) {
        return;
    }
    const statusCode = errors.status || 500;
    const message = errors.message || 'Internal Server Error';
    let responseError = [];
    for (let error of errors.errors) {
        responseError.push({
            message: error.msg,
            field: error.path,
        });
    }
    res.status(statusCode).json({
        success: false,
        message,
        responseError
    });
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
