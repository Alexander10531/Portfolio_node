"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
class CustomException extends Error {
    constructor(message, status, errors) {
        super(message);
        this.status = status;
        if (errors) {
            this.errors = errors;
        }
    }
}
exports.CustomException = CustomException;
exports.default = CustomException;
