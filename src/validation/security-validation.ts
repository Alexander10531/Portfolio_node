
const expressValidator = require('express-validator');

export const apiKeyValidation = [
    expressValidator.body("email")
        .isEmail().withMessage("Field email must be a valid email")
        .notEmpty().withMessage("Field email must not be empty"), 
    expressValidator.body("publicKey")
        .notEmpty().withMessage("Field publicKey must not be empty")
]