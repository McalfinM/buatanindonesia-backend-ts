"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        (0, express_validator_1.body)('comment', 'comment harus di isi').notEmpty(),
    ];
};
exports.bodyValidation = bodyValidation;
const updatePost = () => {
    return [
        (0, express_validator_1.body)('title', 'Judul harus di isi').notEmpty(),
        (0, express_validator_1.body)('category', 'Kategori harus di isi').notEmpty(),
        (0, express_validator_1.body)('content', 'Kontent harus di isi').notEmpty()
    ];
};
exports.updatePost = updatePost;
