import { body, ValidationChain } from 'express-validator'
import { translate } from '../../../helpers/validatorTranslation'

export const bodyValidation = (): ValidationChain[] => {
    return [
        body('name', 'Nama tidak boleh kosong').notEmpty(),
        body('email', 'Email tidak boleh kosong').notEmpty(),
        body('email', 'Email harus berformat email').isEmail(),
        body('password', 'Password tidak boleh kosong').notEmpty(),
        body('confirm_password', 'Confirm Password tidak boleh kosong').notEmpty(),
        body('phone', 'Nomor handphone tidak boleh kosong').notEmpty().isNumeric()
    ]
}
