import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { authenticate } from '../../middlewares/auth'
import { IVillageController } from '../controllers/interfaces/village'

@injectable()
class VillageRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.VillageController) private villageController: IVillageController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.villageController.findAll)
        this.router.get('/:uuid', this.villageController.findOne)

        return this
    }

}

export default VillageRouter
