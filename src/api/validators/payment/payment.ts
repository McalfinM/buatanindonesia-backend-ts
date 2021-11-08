import { body, ValidationChain } from 'express-validator'
import { translate } from '../../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('address', 'Alamat tidak boleh kosong').notEmpty().isString(),
        body('delivery_date', 'Tanggal pengiriman tidak boleh kosong').notEmpty().isDate(),
        body('phone', 'nomor handphone tidak boleh kosong').notEmpty().isMobilePhone('id-ID'),
        body('notes'),
        body('id', 'Product harus ada').notEmpty().isUUID(),
        body('payment_method', 'Pilih Satu Metode Pembayaran').notEmpty().isString(),
        body('card_number', ''),
        body('idempotency', ''),
        body('card_name', ''),
        body('quantity', 'Jumlah beli harus di isi').notEmpty().isNumeric(),
        body('total_price', 'Total Harga tidak ada').notEmpty().isNumeric(),
        body('image', ''),
        body('cloudinary_id', ''),
    ]
}

export const bodyValidationNonAuth = (): ValidationChain[] => {
    return [
        body('address', 'Alamat tidak boleh kosong').notEmpty().isString(),
        body('delivery_date', 'Tanggal pengiriman tidak boleh kosong').notEmpty().isDate(),
        body('phone', 'nomor handphone tidak boleh kosong').notEmpty().isMobilePhone('id-ID'),
        body('email', 'email tidak boleh kosong').notEmpty().isEmail(),
        body('notes'),
        body('id', 'Product harus ada').notEmpty().isUUID(),
        body('payment_method', 'Pilih Satu Metode Pembayaran').notEmpty().isString(),
        body('card_number', ''),
        body('idempotency', ''),
        body('card_name', ''),
        body('quantity', 'Jumlah beli harus di isi').notEmpty().isNumeric(),
        body('total_price', 'Total Harga tidak ada').notEmpty().isNumeric(),
        body('image', ''),
        body('cloudinary_id', ''),
    ]
}