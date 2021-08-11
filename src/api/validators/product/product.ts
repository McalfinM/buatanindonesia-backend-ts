import { body, ValidationChain } from 'express-validator'
import { translate } from '../../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('name', 'Judul harus di isi').notEmpty().isString(),
        body('description', 'Kategori harus di isi').notEmpty().isString(),
        body('category_uuid', 'Kontent harus di isi').notEmpty().isUUID(),
        body('price', 'Harga harus di isi').notEmpty().isNumeric(),
        body('stock', 'Stok wajib di isi').notEmpty().isNumeric(),
        body('image'),
        body('cloudinary_id')
    ]
}