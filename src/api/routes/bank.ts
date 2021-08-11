import BaseRouter from './baseRouter'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { IBankController } from '../controllers/interfaces/bank'

@injectable()
class BankRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.BankController) private bankController: IBankController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.bankController.findAll)
        this.router.get('/:uuid', this.bankController.findOne)

        return this
    }

}

export default BankRouter
