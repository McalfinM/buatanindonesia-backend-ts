"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        (0, express_validator_1.body)('name', 'Nama tidak boleh kosong').notEmpty(),
        (0, express_validator_1.body)('email', 'Email tidak boleh kosong').notEmpty(),
        (0, express_validator_1.body)('email', 'Email harus berformat email').isEmail(),
        (0, express_validator_1.body)('password', 'Password tidak boleh kosong').notEmpty(),
        (0, express_validator_1.body)('confirm_password', 'Confirm Password tidak boleh kosong').notEmpty()
    ];
};
exports.bodyValidation = bodyValidation;
