"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        (0, express_validator_1.body)('product_uuid', 'please fill this uuid').notEmpty().isUUID(),
    ];
};
exports.bodyValidation = bodyValidation;
