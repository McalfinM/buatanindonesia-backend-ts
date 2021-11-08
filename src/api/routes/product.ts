import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/product/product'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { validate } from '../../middlewares/requestValidation'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { authenticate } from '../../middlewares/auth'
import { IProductController } from '../controllers/interfaces/product'

@injectable()
class ProductRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.ProductController) private productController: IProductController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.productController.findAll)
        this.router.get('/my-product', authenticate, this.productController.findAllWithUser)
        this.router.post('/', authenticate, bodyValidation(), validate, this.productController.create)
        this.router.put('/:uuid', authenticate, bodyValidation(), validate, this.productController.update)
        this.router.get('/:uuid', this.productController.findOne)
        this.router.delete('/:uuid', authenticate, this.productController.delete)
        return this
    }

}

export default ProductRouter
