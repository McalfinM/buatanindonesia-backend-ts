import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import { ErrorBadRequest, ErrorNotFound } from "../helpers/errors";
import { IUserService } from "./interfaces/user";
import CreateUserRequest from "../request/user/createUserRequest";
import UserEntity from "../entities/user";
import bcrypt from 'bcrypt'
import { IUserRepository } from "../repositories/interfaces/user";
import slugify from 'slugify'
import { UserRole, Imagedefault } from "../entities/enums/enum";
import { ITokenService } from "./interfaces/token";
import TokenEntity from "../entities/token";
import { IEmailService } from "./interfaces/email";
import ProfileEntity from "../entities/profile";
import { IProfileService } from "./interfaces/profile";

@injectable()
class UserService implements IUserService {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.TokenService) private tokenService: ITokenService,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.EmailService) private emailService: IEmailService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreateUserRequest): Promise<{ success: true }> {
        if (data.password !== data.confirm_password) {
            throw new ErrorBadRequest('Password tidak sama', '@Create User Service')
        }
        data.email?.toLowerCase()
        const findUser = await this.userRepository.checkEmail(data.email ?? '')
        const findUsername = await this.userRepository.checkUsername(data.name ?? '')
        if (findUsername) throw new ErrorBadRequest('Can\'t use this username', '@Service User Create')
        if (findUser) throw new ErrorBadRequest('Email already registered', '@Service User Create')
        const salt = await bcrypt.genSalt(12)
        const hash = bcrypt.hashSync(data.password, salt)
        const userEntity = new UserEntity({
            name: data.name,
            email: data.email,
            uuid: uuidv4(),
            password: hash,
            roles: [UserRole.MEMBER],
            is_active: false,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        });
        const profile = new ProfileEntity({
            uuid: uuidv4(),
            created_by: {
                uuid: userEntity.uuid ?? '',
                name: userEntity.name ?? '',
            },
            slug: slugify(userEntity.name ?? '') + uuidv4(),
            roles: [UserRole.MEMBER],
            address: '',
            card_number: '',
            city: {},
            district: {},
            email: userEntity.email ?? '',
            image: Imagedefault.IMAGE_DEFAULT,
            village: {},
            phone: '',
            cloudinary_id: '',
            bank: {},
            is_active: false,
            created_at: new Date,
            province: {},
            updated_at: new Date,
            deleted_at: null
        })
        const tokenEntity = new TokenEntity({
            uuid: '',
            activity: 'CreateUser',
            email: data.email ?? '',
            revoked: false,
            token: '',
            user_uuid: userEntity.uuid ?? '',
            created_at: new Date,
            updated_at: new Date
        })
        const tokenService = await this.tokenService.create(tokenEntity)
        const profileService = await this.profileService.create(profile)
        // await this.emailService.sendEmailVerificationAccout(tokenService.token, data.email ?? '')
        await this.userRepository.create(userEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<UserEntity | null> {
        const result = await this.userRepository.findOne(uuid)

        return result
    }

    async checkEmail(email: string): Promise<UserEntity | null> {
        const result = await this.userRepository.checkEmail(email)

        return result
    }
    async update(data: CreateUserRequest): Promise<{ success: true }> {

        return { success: true }
    }

    async chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }> {
        const response = await this.userRepository.chainUpdateFromProfile(name, uuid)

        return { success: true }
    }

    async updateForSeller(data: UserEntity): Promise<{ success: true }> {
        await this.userRepository.update(data)

        return { success: true }
    }

}

export default UserService
