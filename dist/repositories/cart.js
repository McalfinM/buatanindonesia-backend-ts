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
const cart_1 = __importDefault(require("../entities/cart"));
const cart_2 = __importDefault(require("../models/cart"));
let CartRepository = class CartRepository {
    async create(data) {
        await cart_2.default.create({
            uuid: data.uuid,
            quantity: data.quantity,
            product: data.product,
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at
        });
        return { success: true };
    }
    async findOne(uuid, user_uuid) {
        const result = await cart_2.default.findOne({ uuid: uuid, "created_by.uuid": user_uuid });
        return result ? new cart_1.default(result) : null;
    }
    // async findOneMyProduct(user_uuid:string,product_uuid: string): Promise<CartEntity | null> {
    //     const result = await CartModel.findOne({ "created_by.uuid": user_uuid,  })
    //     return result ? new CartEntity(result) : null
    // }
    async findOneMyCart(user_uuid) {
        const result = await cart_2.default.findOne({ "created_by.uuid": user_uuid });
        return result ? new cart_1.default(result) : null;
    }
    async delete(uuid, user_uuid) {
        const deleteCart = await cart_2.default.updateOne({ "created_by.uuid": user_uuid, "product.uuid": uuid }, { $pull: { product: { uuid: uuid } } }, {
            upsert: false,
            multi: true
        });
        return { success: true };
    }
    async update(data) {
        await cart_2.default.updateOne({ uuid: data.uuid }, {
            ...data.toJson()
        });
        return { success: true };
    }
    async findAll(user_uuid) {
        const cart = await cart_2.default.findOne({ "created_by.uuid": user_uuid });
        return cart ? new cart_1.default(cart) : null;
    }
};
CartRepository = __decorate([
    (0, inversify_1.injectable)()
], CartRepository);
exports.default = CartRepository;
