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
const sellerRequest_1 = __importDefault(require("../entities/sellerRequest"));
const sellerRequestSpecification_1 = __importDefault(require("../repositories/specifications/sellerRequestSpecification"));
const profile_1 = __importDefault(require("../entities/profile"));
const enum_1 = require("../entities/enums/enum");
const user_1 = __importDefault(require("../entities/user"));
let SellerRequestService = class SellerRequestService {
    sellerRequestRepository;
    profileService;
    userService;
    bankService;
    dispatcher;
    constructor(sellerRequestRepository, profileService, userService, bankService, dispatcher) {
        this.sellerRequestRepository = sellerRequestRepository;
        this.profileService = profileService;
        this.userService = userService;
        this.bankService = bankService;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        const searchUser = await this.profileService.findOne(user.uuid);
        if (!searchUser)
            throw new errors_1.ErrorNotFound('User not found', '@Service Create Seller');
        const bank = await this.bankService.findOne(data.bank_uuid);
        const entity = new sellerRequest_1.default({
            uuid: uuid_1.v4(),
            card_holder_name: data.card_holder_name,
            card_number: data.card_number,
            created_by: {
                uuid: searchUser.created_by.uuid,
                name: searchUser.created_by.name,
                image: searchUser.image
            },
            phone: data.phone,
            email: searchUser.email,
            image: data.image,
            ktp_image: data.ktp_image,
            name: data.name,
            status: 'Pending',
            bank: bank.toJson(),
            deleted_at: null,
            created_at: new Date,
            updated_at: new Date,
        });
        return await this.sellerRequestRepository.create(entity);
    }
    async findOne(uuid) {
        const result = await this.sellerRequestRepository.findOne(uuid);
        return result ? new sellerRequest_1.default(result) : null;
    }
    async update(uuid, data, user) {
        const searchSellerRequest = await this.sellerRequestRepository.findOne(uuid);
        if (!searchSellerRequest)
            throw new errors_1.ErrorNotFound('Request not found ', '@Service update to seller');
        const searchUser = await this.profileService.findOne(searchSellerRequest?.created_by.uuid ?? '');
        if (!searchUser)
            throw new errors_1.ErrorNotFound('User not found', '@service update to seller');
        const bank = await this.bankService.findOne(data.bank_uuid);
        if (!bank)
            throw new errors_1.ErrorNotFound('Bank not found', '@Service update to seller');
        const entity = new sellerRequest_1.default({
            uuid: searchSellerRequest?.uuid ?? '',
            card_holder_name: data.card_holder_name,
            card_number: data.card_number,
            phone: data.phone,
            created_by: {
                uuid: searchUser.created_by.uuid,
                name: searchUser.created_by.name,
                image: searchUser.image
            },
            email: searchUser.email,
            ktp_image: data.ktp_image,
            name: data.name,
            image: data.image,
            status: 'Pending',
            bank: bank,
            deleted_at: null,
            created_at: searchSellerRequest?.created_at ?? new Date,
            updated_at: searchSellerRequest?.updated_at ?? new Date,
        });
        const result = await this.sellerRequestRepository.update(entity);
        return { success: true };
    }
    async updateToSeller(uuid) {
        const searchRequest = await this.sellerRequestRepository.findOne(uuid);
        // if (searchRequest?.status === 'Completed') throw new ErrorNotFound('Expired Data', '@Servoce change to seller ')
        if (!searchRequest)
            throw new errors_1.ErrorNotFound('Data not found', '@Service Change member to seller');
        const searchProfile = await this.profileService.findOne(searchRequest.created_by.uuid ?? '');
        if (!searchProfile)
            throw new errors_1.ErrorNotFound('Data not found', '@Service Change user to seller in Profile');
        const searchUser = await this.userService.findOne(searchRequest.created_by.uuid ?? '');
        if (!searchUser)
            throw new errors_1.ErrorNotFound('Data not found', '@Service Change user to seller in user');
        const profileEntity = new profile_1.default({
            uuid: searchProfile.uuid,
            card_number: searchRequest.card_number,
            province: searchProfile.province,
            city: searchProfile.city,
            district: searchProfile.district,
            village: searchProfile.village,
            cloudinary_id: searchProfile.cloudinary_id,
            email: searchProfile.email,
            created_by: searchProfile.created_by,
            image: searchProfile.image,
            phone: searchProfile.phone ?? searchRequest.phone,
            created_at: searchProfile.created_at,
            updated_at: searchProfile.updated_at,
            deleted_at: searchProfile.deleted_at,
            roles: [enum_1.UserRole.MEMBER, enum_1.UserRole.Seller],
            slug: searchProfile.slug,
            address: searchProfile.address,
            bank: searchRequest.bank
        });
        const userEntity = new user_1.default({
            uuid: searchUser.uuid,
            email: searchUser.email,
            name: searchUser.name,
            password: searchUser.password,
            roles: [enum_1.UserRole.MEMBER, enum_1.UserRole.Seller],
            is_active: searchUser.is_active,
            created_at: searchUser.created_at,
            updated_at: searchUser.updated_at,
            deleted_at: searchUser.deleted_at
        });
        await this.userService.updateForSeller(userEntity);
        await this.profileService.updateForSeller(profileEntity);
        searchRequest.status = 'Completed';
        await this.sellerRequestRepository.update(searchRequest);
        return { success: true };
    }
    async index(data) {
        return await this.sellerRequestRepository.index(new sellerRequestSpecification_1.default(data));
    }
    async delete(uuid, user_uuid) {
        await this.sellerRequestRepository.delete(uuid, user_uuid);
        return { success: true };
    }
};
SellerRequestService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.SellerRequestRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.ProfileService)),
    __param(2, inversify_1.inject(types_1.TYPES.UserService)),
    __param(3, inversify_1.inject(types_1.TYPES.BankService)),
    __param(4, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], SellerRequestService);
exports.default = SellerRequestService;
