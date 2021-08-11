import BaseRouter from './baseRouter'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { authenticate } from '../../middlewares/auth'
import { ICartController } from '../controllers/interfaces/cart'
import { bodyValidation } from '../validators/vehicleBrand'
import { validate } from '../../middlewares/requestValidation'

@injectable()
class CartRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.CartController) private cartController: ICartController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', authenticate, this.cartController.findAll)
        this.router.post('/', authenticate, bodyValidation(), validate, this.cartController.createOrUpdate)
        this.router.get('/:uuid', authenticate, this.cartController.findOne)
        this.router.delete('/:slug', this.cartController.delete)

        return this
    }

}

export default CartRouter
