"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        express_validator_1.body('name', 'Judul harus di isi').notEmpty().isString(),
        express_validator_1.body('description', 'Kategori harus di isi').notEmpty().isString(),
        express_validator_1.body('category_uuid', 'Kontent harus di isi').notEmpty().isUUID(),
        express_validator_1.body('price', 'Harga harus di isi').notEmpty().isNumeric(),
        express_validator_1.body('stock', 'Stok wajib di isi').notEmpty().isNumeric(),
        express_validator_1.body('image'),
        express_validator_1.body('cloudinary_id')
    ];
};
exports.bodyValidation = bodyValidation;
