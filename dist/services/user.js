"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../types");
const uuid_1 = require("uuid");
const errors_1 = require("../helpers/errors");
const user_1 = __importDefault(require("../entities/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const slugify_1 = __importDefault(require("slugify"));
const enum_1 = require("../entities/enums/enum");
const token_1 = __importDefault(require("../entities/token"));
const profile_1 = __importDefault(require("../entities/profile"));
let UserService = class UserService {
    userRepository;
    tokenService;
    profileService;
    emailService;
    dispatcher;
    constructor(userRepository, tokenService, profileService, emailService, dispatcher) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.profileService = profileService;
        this.emailService = emailService;
        this.dispatcher = dispatcher;
    }
    async create(data) {
        if (data.password !== data.confirm_password) {
            throw new errors_1.ErrorBadRequest('Password tidak sama', '@Create User Service');
        }
        data.email?.toLowerCase();
        const findUser = await this.userRepository.checkEmail(data.email ?? '');
        const findUsername = await this.userRepository.checkUsername(data.name ?? '');
        const phoneNumber = await this.userRepository.checkUsername(data.name ?? '');
        if (findUsername)
            throw new errors_1.ErrorBadRequest('Can\'t use this username', '@Service User Create');
        if (findUser)
            throw new errors_1.ErrorBadRequest('Email already registered', '@Service User Create');
        if (phoneNumber)
            throw new errors_1.ErrorBadRequest('Nomor handphone telah terdaftar', '@Service User => Create');
        const salt = await bcrypt_1.default.genSalt(12);
        const hash = bcrypt_1.default.hashSync(data.password, salt);
        const userEntity = new user_1.default({
            name: data.name,
            email: data.email,
            uuid: (0, uuid_1.v4)(),
            password: hash,
            roles: [enum_1.UserRole.MEMBER],
            is_active: false,
            phone_number: data.phone,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        });
        const profile = new profile_1.default({
            uuid: (0, uuid_1.v4)(),
            created_by: {
                uuid: userEntity.uuid ?? '',
                name: userEntity.name ?? '',
            },
            slug: (0, slugify_1.default)(userEntity.name ?? '') + (0, uuid_1.v4)(),
            roles: [enum_1.UserRole.MEMBER],
            address: '',
            card_number: '',
            city: {},
            district: {},
            email: userEntity.email ?? '',
            image: enum_1.Imagedefault.IMAGE_DEFAULT,
            village: {},
            phone: '',
            cloudinary_id: '',
            bank: {},
            is_active: false,
            created_at: new Date,
            province: {},
            updated_at: new Date,
            deleted_at: null
        });
        const tokenEntity = new token_1.default({
            uuid: '',
            activity: 'CreateUser',
            email: data.email ?? '',
            revoked: false,
            token: '',
            user_uuid: userEntity.uuid ?? '',
            created_at: new Date,
            updated_at: new Date
        });
        const tokenService = await this.tokenService.create(tokenEntity);
        const profileService = await this.profileService.create(profile);
        // await this.emailService.sendEmailVerificationAccout(tokenService.token, data.email ?? '')
        await this.userRepository.create(userEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.userRepository.findOne(uuid);
        return result;
    }
    async checkEmail(email) {
        const result = await this.userRepository.checkEmail(email);
        return result;
    }
    async update(data) {
        return { success: true };
    }
    async chainUpdateFromProfile(name, uuid) {
        const response = await this.userRepository.chainUpdateFromProfile(name, uuid);
        return { success: true };
    }
    async updateForSeller(data) {
        await this.userRepository.update(data);
        return { success: true };
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.TokenService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ProfileService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.EmailService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.ProducerDispatcher))
], UserService);
exports.default = UserService;
