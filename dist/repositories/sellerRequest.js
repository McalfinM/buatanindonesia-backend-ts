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
const sellerRequest_1 = __importDefault(require("../entities/sellerRequest"));
const sellerRequest_2 = __importDefault(require("../models/sellerRequest"));
let SellerRequestRepository = class SellerRequestRepository {
    async create(data) {
        const result = await sellerRequest_2.default.create(data.toJSON());
        return new sellerRequest_1.default(result);
    }
    async findOne(uuid) {
        const result = await sellerRequest_2.default.findOne({
            uuid: uuid,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        });
        return result ? new sellerRequest_1.default(result) : null;
    }
    async findOneByUserUuid(uuid) {
        console.log(uuid, 'uuid');
        const result = await sellerRequest_2.default.findOne({
            "created_by.uuid": uuid,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        });
        return result ? new sellerRequest_1.default(result) : null;
    }
    async update(data) {
        const result = await sellerRequest_2.default.updateOne({ uuid: data.uuid ?? '', deleted_at: null }, {
            ...data.toJson()
        });
        return data;
    }
    async delete(uuid, user_uuid) {
        const result = await sellerRequest_2.default.updateOne({ uuid: uuid ?? '', "created_by.uuid": user_uuid }, {
            deleted_at: new Date
        });
        return { success: true };
    }
    async index(specification) {
        const total_customer = await sellerRequest_2.default.find({
            ...specification.specifies(),
        }).countDocuments();
        return sellerRequest_2.default.find({
            ...specification.specifies(),
        }, {}, {
            ...specification.paginate(),
            sort: specification.specSort(),
        })
            .then((result) => {
            return {
                total: total_customer,
                data: result.map((data) => {
                    return new sellerRequest_1.default({
                        uuid: data.uuid,
                        email: data.email,
                        card_holder_name: data.card_holder_name,
                        card_number: data.card_number,
                        created_by: data.created_by,
                        image: data.image,
                        bank: data.bank,
                        status: data.status,
                        phone: data.phone,
                        ktp_image: data.ktp_image,
                        address: data.address,
                        name: data.name,
                        province: data.province,
                        city: data.city,
                        district: data.district,
                        village: data.village,
                        created_at: data.created_at,
                        updated_at: data.updated_at,
                        deleted_at: data.deleted_at
                    });
                }),
            };
        })
            .catch((err) => {
            return err;
        });
    }
};
SellerRequestRepository = __decorate([
    (0, inversify_1.injectable)()
], SellerRequestRepository);
exports.default = SellerRequestRepository;
