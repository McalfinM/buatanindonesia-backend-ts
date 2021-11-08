import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/payment/payment'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ILikeController } from '../controllers/interfaces/like'
import { authenticate } from '../../middlewares/auth'
import { IPaymentController } from '../controllers/interfaces/payment'
import { validate } from '../../middlewares/requestValidation'

@injectable()
class PaymentRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.PaymentController) private paymentControlelr: IPaymentController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.post('/', bodyValidation(), validate, authenticate, this.paymentControlelr.create)
        this.router.post('/buy', bodyValidation(), validate, this.paymentControlelr.createNonAuth)
        this.router.get('/', authenticate, this.paymentControlelr.index)
        this.router.get('/seller-bought', authenticate, this.paymentControlelr.findAllBySellerUuid)
        this.router.get('/:uuid', authenticate, this.paymentControlelr.findOne)
        this.router.patch('/:uuid/upload-payment', authenticate, this.paymentControlelr.uploadPayment)
        this.router.patch('/:uuid/confirm-item-delivery', authenticate, this.paymentControlelr.confirmItemDelivery)
        this.router.patch('/:uuid/confirm-item-ongoing', authenticate, this.paymentControlelr.confirmItemOngoing)
        return this
    }

}

export default PaymentRouter
