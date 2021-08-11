import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { authenticate } from '../../middlewares/auth'
import { IProvinceController } from '../controllers/interfaces/province'

@injectable()
class ProvinceRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.ProvinceController) private provinceController: IProvinceController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.provinceController.findAll)
        this.router.get('/:uuid', this.provinceController.findOne)

        return this
    }

}

export default ProvinceRouter
