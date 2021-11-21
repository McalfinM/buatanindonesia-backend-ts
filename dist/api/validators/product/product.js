"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        (0, express_validator_1.body)('name', 'Judul harus di isi').exists().isString(),
        (0, express_validator_1.body)('description', 'Kategori harus di isi').exists().isString(),
        (0, express_validator_1.body)('category_uuid', 'kategori harus di isi').exists().isUUID(),
        (0, express_validator_1.body)('price', 'Harga harus di isi').exists().isNumeric(),
        (0, express_validator_1.body)('stock', 'Stok wajib di isi').exists().isNumeric(),
    ];
};
exports.bodyValidation = bodyValidation;
