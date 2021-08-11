"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerValidation = void 0;
const express_validator_1 = require("express-validator");
const sellerValidation = () => {
    return [
        express_validator_1.body('card_holder_name', 'Nama pemilik kartu harus sesuai seperti di kartu anda').notEmpty().isString(),
        express_validator_1.body('bank_uuid', 'Bank harus di isi').notEmpty().isString(),
        express_validator_1.body("image", 'Foto bukti usaha harus di isi').optional({ nullable: true, checkFalsy: true }).default([]).isArray(),
        express_validator_1.body("image.*", 'Foto bukti usaha harus di isi').optional({ nullable: true, checkFalsy: true }).isString().isURL(),
        express_validator_1.body('card_number', 'Nomor kartu bank anda tidak boleh kosong').notEmpty().isString(),
        express_validator_1.body('phone', 'Nomor handphone wajib di isi').notEmpty().isString(),
        express_validator_1.body('name', 'Mohon isi Nama Lengkap Anda').notEmpty().isString(),
        express_validator_1.body('ktp_image', 'Mohon masukan foto ktp anda').notEmpty().isString().isURL(),
    ];
};
exports.sellerValidation = sellerValidation;
