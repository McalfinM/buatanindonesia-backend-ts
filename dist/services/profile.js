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
const profile_1 = __importDefault(require("../entities/profile"));
const profileSpecification_1 = __importDefault(require("../repositories/specifications/profileSpecification"));
const slugify_1 = __importDefault(require("slugify"));
const errors_1 = require("../helpers/errors");
const enum_1 = require("../entities/enums/enum");
let ProfileService = class ProfileService {
    profileReopsitory;
    commentService;
    provinceService;
    cityService;
    districtService;
    villageService;
    bankService;
    dispatcher;
    constructor(profileReopsitory, commentService, provinceService, cityService, districtService, villageService, bankService, dispatcher) {
        this.profileReopsitory = profileReopsitory;
        this.commentService = commentService;
        this.provinceService = provinceService;
        this.cityService = cityService;
        this.districtService = districtService;
        this.villageService = villageService;
        this.bankService = bankService;
        this.dispatcher = dispatcher;
    }
    async create(data) {
        const profileEntity = new profile_1.default({
            uuid: data.uuid,
            created_by: {
                uuid: data.created_by.uuid ?? '',
                name: data.created_by.name ?? '',
            },
            slug: (0, slugify_1.default)(data.created_by.name ?? '', {
                replacement: '-',
                strict: true
            }) + (0, uuid_1.v4)(),
            roles: [enum_1.UserRole.MEMBER],
            address: '',
            card_number: '',
            city: data.city,
            district: data.city,
            email: data.email ?? '',
            image: data.image,
            village: data.village,
            phone: data.phone,
            cloudinary_id: data.cloudinary_id,
            created_at: data.created_at,
            province: data.province,
            bank: data.bank,
            is_active: false,
            updated_at: data.updated_at,
            deleted_at: null
        });
        await this.profileReopsitory.create(profileEntity);
        return { success: true };
    }
    async findOne(uuid) {
        const result = await this.profileReopsitory.findOne(uuid);
        return result;
    }
    async update(data, user) {
        const searchProfile = await this.profileReopsitory.findOne(user.uuid);
        const province = await this.provinceService.findOne(data.province_uuid);
        const city = await this.cityService.findOne(data.city_uuid);
        const district = await this.districtService.findOne(data.district_uuid);
        const village = await this.villageService.findOne(data.village_uuid);
        const commentService = await this.commentService.findOne(user.uuid);
        const bank = data.bank_uuid ? await this.bankService.findOne(data.bank_uuid) : null;
        if (!searchProfile)
            throw new errors_1.ErrorNotFound('Data not found', '@Service Update profile');
        let slugi = '';
        if (searchProfile.created_by.name !== data.name) {
            slugi = (0, slugify_1.default)(data.name ?? '', {
                replacement: '-',
                strict: true,
            }) + (0, uuid_1.v4)();
        }
        else {
            slugi = searchProfile.slug;
        }
        // if (searchProfile.cloudinary_id !== data.cloudinary_id) {
        //     await cloud.uploader.destroy('profile/' + searchProfile.cloudinary_id)
        // }
        const profileEntity = new profile_1.default({
            uuid: searchProfile.uuid,
            created_by: {
                uuid: searchProfile.uuid,
                name: data.name ?? '',
            },
            slug: slugi,
            roles: [enum_1.UserRole.MEMBER],
            address: data.address,
            card_number: data.card_number,
            city: city ?? {},
            district: district ?? {},
            province: province ?? {},
            village: village ?? {},
            email: data.email ?? '',
            image: data.image,
            phone: data.phone,
            cloudinary_id: data.cloudinary_id,
            bank: {
                uuid: bank?.uuid ?? '',
                name: bank?.name ?? ''
            },
            is_active: searchProfile.is_active,
            created_at: searchProfile.created_at,
            updated_at: new Date,
            deleted_at: null
        });
        // if (postService.data.length > 0) {
        //     if (postService.data[0].created_by.name !== data.nickname || postService.data[0].created_by.image !== data.image) {
        //         await this.postService.chainUpdateFromProfile(profileEntity)
        //     }
        // }
        if (commentService) {
            if (commentService.created_by.name !== data.name || commentService.created_by.image !== data.image) {
                await this.commentService.chainUpdateFromProfile(profileEntity);
            }
        }
        // if (userService) {
        //     if (userService.name !== data.nickname) {
        //         await this.userService.chainUpdateFromProfile(data.nickname ?? '', user.uuid)
        //     }
        // }
        await this.profileReopsitory.update(profileEntity);
        return { success: true };
    }
    async findOneBySlug(slug) {
        const result = await this.profileReopsitory.findOneBySlug(slug);
        const likes = await this.commentService.find(result?.uuid ?? '');
        const commentEntity = await this.commentService.find(result?.uuid ?? '');
        let stringLikes = [];
        for (let i = 0; i < likes.data.length; i++) {
            stringLikes.push(likes.data[i].created_by.uuid ?? '');
        }
        return {
            data: result,
            likes: stringLikes,
            comment: commentEntity.data,
        };
    }
    async index(data) {
        return await this.profileReopsitory.index(new profileSpecification_1.default(data));
    }
    async updateIsActiveTrue(user_uuid, is_active) {
        await this.profileReopsitory.updateIsActiveTrue(user_uuid, is_active);
        return { success: true };
    }
    async updateForSeller(data) {
        await this.profileReopsitory.update(data);
        return { success: true };
    }
    async findMyProfile(user) {
        await this.profileReopsitory.findOne(user.uuid);
        return { success: true };
    }
};
ProfileService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ProfileRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.CommentService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ProvinceService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.CityService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.DistrictService)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.VillageService)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.BankService)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.ProducerDispatcher))
], ProfileService);
exports.default = ProfileService;
