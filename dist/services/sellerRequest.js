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
const cloudinary_1 = require("../helpers/cloudinary");
let SellerRequestService = class SellerRequestService {
    sellerRequestRepository;
    profileService;
    userService;
    bankService;
    provinceService;
    cityService;
    districtService;
    villageService;
    constructor(sellerRequestRepository, profileService, userService, bankService, provinceService, cityService, districtService, villageService) {
        this.sellerRequestRepository = sellerRequestRepository;
        this.profileService = profileService;
        this.userService = userService;
        this.bankService = bankService;
        this.provinceService = provinceService;
        this.cityService = cityService;
        this.districtService = districtService;
        this.villageService = villageService;
    }
    async create(data, user) {
        const searchUser = await this.profileService.findOne(user.uuid);
        if (!searchUser)
            throw new errors_1.ErrorNotFound('User tidak ditemukan', '@Service Create Seller');
        const sellerRequest = await this.sellerRequestRepository.findOneByUserUuid(searchUser.created_by.uuid ?? '');
        if (sellerRequest)
            throw new errors_1.ErrorBadRequest('Kamu sudah pernah request sebagai seller', '@Service Create Request Seller');
        const province = await this.provinceService.findOne(data.province_uuid);
        if (!province)
            throw new errors_1.ErrorNotFound('Province tidak ditemukan', '@Service Create Request Seller');
        const city = await this.cityService.findOne(data.city_uuid);
        if (!city)
            throw new errors_1.ErrorNotFound('City tidak ditemukan', '@Service Create Request Seller');
        const district = await this.districtService.findOne(data.district_uuid);
        if (!district)
            throw new errors_1.ErrorNotFound('District tidak ditemukan', '@Service Create Request Seller');
        const village = await this.villageService.findOne(data.village_uuid);
        if (!village)
            throw new errors_1.ErrorNotFound('Village tidak ditemukan', '@Service Create Request Seller');
        if (village.district_uuid !== district.uuid && district.city_uuid !== city.uuid && city.province_uuid !== province.uuid)
            throw new errors_1.ErrorNotFound('Apakah anda yakin daerah itu ada ?', '@Service Seller Request => Create');
        const bank = await this.bankService.findOne(data.bank_uuid);
        const entity = new sellerRequest_1.default({
            uuid: (0, uuid_1.v4)(),
            card_holder_name: "",
            card_number: "",
            created_by: {
                uuid: searchUser.created_by.uuid,
                name: searchUser.created_by.name,
                image: searchUser.image
            },
            address: data.address,
            phone: data.phone,
            email: searchUser.email,
            image: "",
            ktp_image: "",
            name: data.name,
            status: 'Pending',
            bank: bank,
            province: {
                uuid: province.uuid,
                name: province.name,
            },
            city: {
                uuid: city.uuid,
                name: city.name,
            },
            district: {
                uuid: district.uuid,
                name: district.name
            },
            village: {
                uuid: village.uuid,
                name: village.name,
            },
            deleted_at: null,
            created_at: new Date,
            updated_at: new Date,
        });
        const sellerEntity = await this.sellerRequestRepository.create(entity);
        this.uploadImage(sellerEntity.uuid, data.image, 'image');
        this.uploadImage(sellerEntity.uuid, data.ktp_image, 'ktp');
        return { success: true };
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
        if (!searchUser || searchUser.created_by.uuid !== user.uuid)
            throw new errors_1.ErrorNotFound('User not found', '@service update to seller');
        const bank = await this.bankService.findOne(data.bank_uuid);
        if (!bank)
            throw new errors_1.ErrorNotFound('Bank not found', '@Service update to seller');
        const province = await this.provinceService.findOne(data.province_uuid);
        const city = await this.cityService.findOne(data.city_uuid);
        const district = await this.districtService.findOne(data.district_uuid);
        const village = await this.villageService.findOne(data.village_uuid);
        const entity = new sellerRequest_1.default({
            uuid: searchSellerRequest?.uuid ?? '',
            card_holder_name: "",
            card_number: "",
            phone: data.phone,
            created_by: {
                uuid: searchUser.created_by.uuid,
                name: searchUser.created_by.name,
                image: searchUser.image
            },
            email: searchUser.email,
            ktp_image: data.ktp_image,
            name: data.name ?? searchSellerRequest.name,
            image: data.image,
            status: 'Pending',
            bank: bank,
            deleted_at: null,
            province: province,
            city: city,
            district: district,
            address: searchSellerRequest.address,
            village: village,
            created_at: searchSellerRequest?.created_at ?? new Date,
            updated_at: searchSellerRequest?.updated_at ?? new Date,
        });
        const result = await this.sellerRequestRepository.update(entity);
        return { success: true };
    }
    async updateToSeller(uuid) {
        const searchRequest = await this.sellerRequestRepository.findOne(uuid);
        if (searchRequest?.status === 'Completed')
            throw new errors_1.ErrorNotFound('Expired Data', '@Servoce change to seller ');
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
            province: searchRequest.province,
            city: searchRequest.city,
            district: searchRequest.district,
            village: searchRequest.village,
            cloudinary_id: searchProfile.cloudinary_id,
            email: searchProfile.email,
            created_by: searchProfile.created_by,
            image: searchProfile.image,
            phone: searchProfile.phone ?? searchRequest.phone,
            created_at: searchProfile.created_at,
            updated_at: searchProfile.updated_at,
            deleted_at: searchProfile.deleted_at,
            roles: [enum_1.UserRole.MEMBER, enum_1.UserRole.Seller],
            is_active: searchProfile.is_active,
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
            phone_number: searchUser.phone_number,
            is_active: searchUser.is_active,
            created_at: searchUser.created_at,
            updated_at: searchUser.updated_at,
            deleted_at: searchUser.deleted_at
        });
        await this.userService.updateForSeller(userEntity);
        await this.profileService.updateForSeller(profileEntity);
        searchRequest.status = 'Completed';
        searchRequest.deleted_at = new Date();
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
    async uploadImage(uuid, image, key) {
        const upload = await (0, cloudinary_1.cloudSellerRequest)(image);
        const menu = await this.findOne(uuid);
        if (!menu)
            throw new errors_1.ErrorNotFound('Menu tidak ada', '@Service menu upload image');
        if (key == 'ktp') {
            menu.ktp_image = upload.secure_url;
        }
        else if (key == 'image') {
            menu.image = upload.secure_url;
        }
        await this.updateForImage(menu.uuid, menu);
    }
    async updateForImage(uuid, data) {
        const sellerRequest = new sellerRequest_1.default(data);
        await this.sellerRequestRepository.update(sellerRequest);
        return { success: true };
    }
    async findOneByUserUuid(user_uuid) {
        const sellerRequest = await this.sellerRequestRepository.findOneByUserUuid(user_uuid);
        return sellerRequest ? new sellerRequest_1.default(sellerRequest) : null;
    }
};
SellerRequestService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.SellerRequestRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ProfileService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.UserService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.BankService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.ProvinceService)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.CityService)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.DistrictService)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.VillageService))
], SellerRequestService);
exports.default = SellerRequestService;
