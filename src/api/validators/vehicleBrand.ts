import { body, ValidationChain } from 'express-validator'
import { translate } from '../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('product_uuid', 'pilih produk kamu').notEmpty().isUUID(),

    ]
}
