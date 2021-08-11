"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        express_validator_1.body('product_uuid', 'pilih produk kamu').notEmpty().isUUID(),
    ];
};
exports.bodyValidation = bodyValidation;
