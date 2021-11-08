import { body, ValidationChain } from 'express-validator'
import { translate } from '../../../helpers/validatorTranslation'

export const sellerValidation = (): ValidationChain[] => {
    return [
        body('card_holder_name', 'Nama pemilik kartu harus sesuai seperti di kartu anda').notEmpty().isString(),
        body('bank_uuid', 'Bank harus di isi').notEmpty().isString(),
        body("image", 'Foto bukti usaha harus di isi').optional({ nullable: true, checkFalsy: true }).default([]).isArray(),
        body("image.*", 'Foto bukti usaha harus di isi').optional({ nullable: true, checkFalsy: true }).isString().isURL(),
        body('card_number', 'Nomor kartu bank anda tidak boleh kosong').notEmpty().isString(),
        body('phone', 'Nomor handphone wajib di isi').notEmpty().isString(),
        body('name', 'Mohon isi Nama Lengkap Anda').notEmpty().isString(),
        body('ktp_image', 'Mohon masukan foto ktp anda').notEmpty().isString().isURL(),
        body('province_uuid', 'Provinsi tidak boleh kosong').notEmpty().isUUID(),
        body('city_uuid', 'Kota tidak boleh kosong').notEmpty().isUUID(),
        body('district_uuid', 'Kecamatan tidak boleh kosong').notEmpty().isUUID(),
        body('village_uuid', 'Kelurahan tidak boleh kosong').notEmpty().isUUID(),
    ]
}

