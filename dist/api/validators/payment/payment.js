"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidationNonAuth = exports.bodyValidation = void 0;
const express_validator_1 = require("express-validator");
const bodyValidation = () => {
    return [
        (0, express_validator_1.body)('address', 'Alamat tidak boleh kosong').notEmpty().isString(),
        (0, express_validator_1.body)('delivery_date', 'Tanggal pengiriman tidak boleh kosong').notEmpty().isDate(),
        (0, express_validator_1.body)('phone', 'nomor handphone tidak boleh kosong').notEmpty().isMobilePhone('id-ID'),
        (0, express_validator_1.body)('notes'),
        (0, express_validator_1.body)('id', 'Product harus ada').notEmpty().isUUID(),
        (0, express_validator_1.body)('payment_method', 'Pilih Satu Metode Pembayaran').notEmpty().isString(),
        (0, express_validator_1.body)('card_number', ''),
        (0, express_validator_1.body)('idempotency', ''),
        (0, express_validator_1.body)('card_name', ''),
        (0, express_validator_1.body)('quantity', 'Jumlah beli harus di isi').notEmpty().isNumeric(),
        (0, express_validator_1.body)('total_price', 'Total Harga tidak ada').notEmpty().isNumeric(),
        (0, express_validator_1.body)('image', ''),
        (0, express_validator_1.body)('cloudinary_id', ''),
    ];
};
exports.bodyValidation = bodyValidation;
const bodyValidationNonAuth = () => {
    return [
        (0, express_validator_1.body)('address', 'Alamat tidak boleh kosong').notEmpty().isString(),
        (0, express_validator_1.body)('delivery_date', 'Tanggal pengiriman tidak boleh kosong').notEmpty().isDate(),
        (0, express_validator_1.body)('phone', 'nomor handphone tidak boleh kosong').notEmpty().isMobilePhone('id-ID'),
        (0, express_validator_1.body)('email', 'email tidak boleh kosong').notEmpty().isEmail(),
        (0, express_validator_1.body)('notes'),
        (0, express_validator_1.body)('id', 'Product harus ada').notEmpty().isUUID(),
        (0, express_validator_1.body)('payment_method', 'Pilih Satu Metode Pembayaran').notEmpty().isString(),
        (0, express_validator_1.body)('card_number', ''),
        (0, express_validator_1.body)('idempotency', ''),
        (0, express_validator_1.body)('card_name', ''),
        (0, express_validator_1.body)('quantity', 'Jumlah beli harus di isi').notEmpty().isNumeric(),
        (0, express_validator_1.body)('total_price', 'Total Harga tidak ada').notEmpty().isNumeric(),
        (0, express_validator_1.body)('image', ''),
        (0, express_validator_1.body)('cloudinary_id', ''),
    ];
};
exports.bodyValidationNonAuth = bodyValidationNonAuth;
