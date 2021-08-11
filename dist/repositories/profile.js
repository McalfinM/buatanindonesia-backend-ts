"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const profile_1 = __importDefault(require("../entities/profile"));
const profile_2 = __importDefault(require("../models/profile"));
let ProfileRepository = class ProfileRepository {
    async create(data) {
        const result = await profile_2.default.create({
            uuid: data.uuid,
            created_by: {
                uuid: data.created_by.uuid ?? '',
                name: data.created_by.name ?? '',
            },
            slug: data.slug,
            roles: data.roles,
            address: data.address,
            card_number: data.card_number,
            city: data.city,
            district: data.city,
            email: data.email ?? '',
            image: data.image,
            phone: data.phone,
            created_at: data.created_at,
            province: data.province,
            updated_at: data.updated_at,
            deleted_at: null
        });
        return data;
    }
    async findOne(uuid) {
        const result = await profile_2.default.findOne({
            "created_by.uuid": uuid,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        });
        return result ? new profile_1.default(result) : null;
    }
    async checkEmail(email) {
        const result = await profile_2.default.findOne({
            email: email,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        });
        return result ? new profile_1.default(result) : null;
    }
    async findOneByUuid(uuid) {
        const result = await profile_2.default.findOne({
            uuid: uuid,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        });
        return result ? new profile_1.default(result) : null;
    }
    async findOneBySlug(slug) {
        const result = await profile_2.default.findOne({
            slug: slug,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        });
        return result ? new profile_1.default(result) : null;
    }
    async update(data) {
        const result = await profile_2.default.updateOne({ "created_by.uuid": data.created_by.uuid ?? '' }, {
            ...data.toJson()
        });
        return data;
    }
    async chainUpdateFromProfile(name, uuid) {
        console.log(name, uuid);
        const response = await profile_2.default.updateOne({ uuid: uuid }, {
            name: name
        });
        return { success: true };
    }
    async updateIsActiveTrue(user_uuid, is_active) {
        const response = await profile_2.default.updateOne({ uuid: user_uuid }, {
            is_active: is_active
        });
        return { success: true };
    }
    async index(specification) {
        const total_customer = await profile_2.default.find({
            ...specification.specifies(),
        }).countDocuments();
        return profile_2.default.find({
            ...specification.specifies(),
        }, {}, {
            ...specification.paginate(),
            sort: specification.specSort(),
        })
            .then((result) => {
            return {
                total: total_customer,
                data: result.map((data) => {
                    return new profile_1.default({
                        uuid: data.uuid,
                        created_by: {
                            uuid: data.created_by.uuid ?? '',
                            name: data.created_by.name ?? '',
                        },
                        slug: data.slug,
                        roles: data.roles,
                        address: data.address,
                        card_number: data.card_number,
                        city: data.city,
                        district: data.city,
                        email: data.email ?? '',
                        image: data.image,
                        cloudinary_id: data.cloudinary_id,
                        village: data.village,
                        phone: data.phone,
                        created_at: data.created_at,
                        province: data.province,
                        bank: data.bank,
                        updated_at: data.updated_at,
                        deleted_at: null
                    });
                }),
            };
        })
            .catch((err) => {
            return err;
        });
    }
};
ProfileRepository = __decorate([
    inversify_1.injectable()
], ProfileRepository);
exports.default = ProfileRepository;
