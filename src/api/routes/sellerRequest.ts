import BaseRouter from './baseRouter'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { ISellerRequestController } from '../controllers/interfaces/sellerRequest'
import { sellerValidation } from '../validators/sellerRequest/sellerRequest'
import { authenticate } from '../../middlewares/auth'
import { validate } from '../../middlewares/requestValidation'

@injectable()
class SellerRequestRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.SellerRequestController) private sellerRequestController: ISellerRequestController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', authenticate, this.sellerRequestController.index)
        this.router.post('/', authenticate, sellerValidation(), validate, this.sellerRequestController.create)
        this.router.patch('/:uuid', authenticate, sellerValidation(), validate, this.sellerRequestController.update)
        this.router.patch('/:uuid/verify', authenticate, this.sellerRequestController.UpdateToSeller)
        this.router.get('/:uuid', authenticate, this.sellerRequestController.findOne)
        this.router.delete('/:uuid', this.sellerRequestController.delete)

        return this
    }

}

export default SellerRequestRouter
