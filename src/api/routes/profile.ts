import BaseRouter from './baseRouter'
import { bodyValidation } from '../validators/vehicleBrand'
import { Router } from 'express'
import IRouter from './interfaces/router'
import { decorate, inject, injectable } from 'inversify'
import { TYPES } from '../../types'
import { IProfileController } from '../controllers/interfaces/profile'
import { authenticate } from '../../middlewares/auth'

@injectable()
class ProfileRouter extends BaseRouter {

    public router: Router

    constructor(
        @inject(TYPES.ProfileController) private profileController: IProfileController
    ) {
        super()
        this.router = Router()
        this.bindings()
        this.routes()
    }

    routes(): IRouter {
        // call controllers here
        this.router.get('/', this.profileController.index)
        this.router.patch('/', authenticate, this.profileController.update)
        this.router.get('/my-profile', authenticate, this.profileController.findMyProfile)
        this.router.get('/:slug', this.profileController.findOne)

        return this
    }

}

export default ProfileRouter
