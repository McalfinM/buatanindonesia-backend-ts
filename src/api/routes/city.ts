import BaseRouter from './baseRouter'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { authenticate } from '../../middlewares/auth'
import { ICityController } from '../controllers/interfaces/city'

@injectable()
class CityRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.CityController) private cityController: ICityController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.cityController.findAll)
        this.router.get('/:uuid', this.cityController.findOne)

        return this
    }

}

export default CityRouter
