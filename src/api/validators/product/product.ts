import { body, ValidationChain } from 'express-validator'
import { translate } from '../../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('name', 'Judul harus di isi').exists().isString(),
        body('description', 'Kategori harus di isi').exists().isString(),
        body('category_uuid', 'kategori harus di isi').exists().isUUID(),
        body('price', 'Harga harus di isi').exists().isNumeric(),
        body('stock', 'Stok wajib di isi').exists().isNumeric(),
    ]
}