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
const product_1 = __importDefault(require("../entities/product"));
const product_2 = __importDefault(require("../models/product"));
let ProductRepository = class ProductRepository {
    async create(data) {
        const result = await product_2.default.create({
            uuid: data.uuid,
            created_by: data.created_by,
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            stock: data.stock,
            image: data.image,
            category: data.category,
            city: data.city,
            cloudinary_id: data.cloudinary_id,
            is_active: data.is_active,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
        });
        return { success: true };
    }
    async update(data) {
        const result = await product_2.default.updateOne({ uuid: data.uuid, deleted_at: null }, {
            ...data.toJson()
        });
        return { success: true };
    }
    async findOne(uuid) {
        const result = await product_2.default.findOne({ uuid: uuid, deleted_at: null });
        return result ? new product_1.default(result) : null;
    }
    async findOneWithUser(uuid, user_uuid) {
        const result = await product_2.default.findOne({ uuid: uuid, "created_by.uuid": user_uuid, deleted_at: null });
        return result ? new product_1.default(result) : null;
    }
    async findOneBySlug(slug) {
        const result = await product_2.default.findOne({ slug: slug, deleted_at: null });
        return result ? new product_1.default(result) : null;
    }
    async delete(uuid, user_uuid) {
        const result = await product_2.default.updateOne({ uuid: uuid, "created_by.uuid": user_uuid }, {
            deleted_at: new Date
        });
        return { success: true };
    }
    async reduceStock(uuid, quantity) {
        await product_2.default.updateOne({ uuid }, {
            $set: {
                stock: quantity
            }
        });
    }
    async findAll(specification) {
        const total_customer = await product_2.default.find({
            ...specification.specifies(),
        }).countDocuments();
        return product_2.default.find({
            ...specification.specifies(),
        }, {}, {
            ...specification.paginate(),
            sort: specification.specSort(),
        })
            .then((result) => {
            return {
                total: total_customer,
                data: result.map((data) => {
                    return new product_1.default({
                        ...data.toJSON()
                    });
                }),
            };
        })
            .catch((err) => {
            return err;
        });
    }
};
ProductRepository = __decorate([
    (0, inversify_1.injectable)()
], ProductRepository);
exports.default = ProductRepository;
