"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellerValidation = void 0;
const express_validator_1 = require("express-validator");
const sellerValidation = () => {
    return [
        (0, express_validator_1.body)('card_holder_name', 'Nama pemilik kartu harus sesuai seperti di kartu anda').notEmpty().isString(),
        (0, express_validator_1.body)('bank_uuid', 'Bank harus di isi').notEmpty().isString(),
        (0, express_validator_1.body)("image", 'Foto bukti usaha harus di isi').notEmpty().isString(),
        (0, express_validator_1.body)('card_number', 'Nomor kartu bank anda tidak boleh kosong').notEmpty().isString(),
        (0, express_validator_1.body)('phone', 'Nomor handphone wajib di isi').notEmpty().isString(),
        (0, express_validator_1.body)('name', 'Mohon isi Nama Lengkap Anda').notEmpty().isString(),
        (0, express_validator_1.body)('ktp_image', 'Mohon masukan foto ktp anda').notEmpty().isString(),
        (0, express_validator_1.body)('province_uuid', 'Provinsi tidak boleh kosong').notEmpty().isUUID(),
        (0, express_validator_1.body)('city_uuid', 'Kota tidak boleh kosong').notEmpty().isUUID(),
        (0, express_validator_1.body)('district_uuid', 'Kecamatan tidak boleh kosong').notEmpty().isUUID(),
        (0, express_validator_1.body)('village_uuid', 'Kelurahan tidak boleh kosong').notEmpty().isUUID(),
    ];
};
exports.sellerValidation = sellerValidation;
