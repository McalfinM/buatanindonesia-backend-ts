import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { authenticate } from '../../middlewares/auth'
import { IDistrictController } from '../controllers/interfaces/district'

@injectable()
class DistrictRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.DistrictController) private districtController: IDistrictController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.districtController.findAll)
        this.router.get('/:uuid', this.districtController.findOne)

        return this
    }

}

export default DistrictRouter
