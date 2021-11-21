import { inject, injectable } from "inversify";
import { IUserService } from "../../services/interfaces/user";
import { TYPES } from "../../types";
import { IAuthController } from "./interfaces/auth";
import { Response, Request, response } from "express";
import Authentication from "../../helpers/authentication";
import CreateUserRequest from "../../request/user/createUserRequest";
import httpResponse from "../../helpers/httpResponse";
import { ErrorBadRequest, ErrorNotFound, HttpErrorHandler } from "../../helpers/errors";
import { IProfileService } from "../../services/interfaces/profile";

@injectable()
class AuthController {

    constructor(
        @inject(TYPES.UserService) private userService: IUserService,
        @inject(TYPES.ProfileService) private profileService: IProfileService
    ) { }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body
            const data = await this.userService.checkEmail(email)
            const profile = await this.profileService.findOne(data?.uuid ?? '')
            console.log(profile?.toJson(), 'profile')
            if (data?.is_active == false) {
                return res.status(400).json({
                    message: 'Please active your account'
                })
            }
            if (!data) {
                return res.status(404).json({
                    message: 'invalid email or password'
                })
            }

            const compare = await Authentication.passwordCompare(password, data.password)

            if (compare) {
                const token = await Authentication.generateToken(data.name ?? '', email, data.uuid ?? '');
                // data._id = undefined;
                return res.status(200).json({
                    token_type: 'Bearer',
                    token: token,
                    user: {
                        name: data.name,
                        email: email,
                        uuid: data.uuid,
                        image: profile?.image,
                        roles: data.roles,
                    }
                })
            }
        } catch (err) {
            console.log(err)
        }

        return res.status(400).json({
            message: 'Invalid email or password'
        })
    }


    async register(req: Request, res: Response): Promise<Response> {
        const userData = new CreateUserRequest(
            req.body
        );

        return await this.userService.create(userData)
            .then((result) => {
                return httpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));

    }

}

export default AuthController
