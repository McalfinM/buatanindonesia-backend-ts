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
const cart_1 = __importDefault(require("../entities/cart"));
const uuid_1 = require("uuid");
const errors_1 = require("../helpers/errors");
let CartService = class CartService {
    cartRepository;
    productService;
    profileService;
    dispatcher;
    constructor(cartRepository, productService, profileService, dispatcher) {
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.profileService = profileService;
        this.dispatcher = dispatcher;
    }
    async createOrUpdate(data, user) {
        const searchCart = await this.cartRepository.findOneMyCart(user.uuid);
        const searchUser = await this.profileService.findOne(user.uuid);
        let product = [];
        if (!searchCart) {
            const searchProduct = await this.productService.findOne(data.product_uuid);
            if (!searchProduct)
                throw new errors_1.ErrorNotFound('Product not found', '@Service create or update cart');
            if (searchProduct.created_by.uuid == user.uuid)
                throw new errors_1.ErrorBadRequest('You can take alone your product', '@Service Cart Create or Update');
            product.push({
                uuid: (0, uuid_1.v4)(),
                name: searchProduct?.name ?? '',
                image: searchProduct?.image ?? '',
                price: searchProduct?.price ?? 0,
                product_uuid: searchProduct?.uuid ?? '',
                seller_by: searchProduct?.created_by ?? {},
                slug: searchProduct?.slug ?? '',
                stock: searchProduct?.stock ?? 0,
                quantity: 1
            });
            let entityCart = new cart_1.default({
                uuid: (0, uuid_1.v4)(),
                created_by: {
                    uuid: searchUser?.created_by.uuid,
                    name: searchUser?.created_by.name,
                    image: searchUser?.image
                },
                product: product,
                deleted_at: null,
                quantity: product.length,
                updated_at: new Date(),
                created_at: new Date()
            });
            await this.cartRepository.create(entityCart);
        }
        else {
            const searchProduct = await this.productService.findOne(data.product_uuid);
            if (!searchProduct)
                throw new errors_1.ErrorNotFound('Product not found', '@Service create or update cart');
            for (let i = 0; i < searchCart.product.length; i++) {
                if (searchCart.product[i].product_uuid === data.product_uuid) {
                    await this.cartRepository.delete(searchCart.product[i].uuid ?? '', user.uuid);
                    searchCart.product[i].quantity += 1;
                    searchCart.quantity = searchCart.product[i].quantity;
                    return await this.cartRepository.update(searchCart);
                }
            }
            product.push({
                uuid: (0, uuid_1.v4)(),
                name: searchProduct?.name ?? '',
                image: searchProduct?.image ?? '',
                price: searchProduct?.price ?? 0,
                product_uuid: searchProduct?.uuid ?? '',
                seller_by: searchProduct?.created_by ?? {},
                slug: searchProduct?.slug ?? '',
                stock: searchProduct?.stock ?? 0,
                quantity: 1
            });
            let concat = searchCart.product.concat(product);
            let entityCart = new cart_1.default({
                uuid: searchCart.uuid,
                created_by: {
                    uuid: searchUser?.created_by.uuid,
                    name: searchUser?.created_by.name,
                    image: searchUser?.image
                },
                product: concat,
                deleted_at: null,
                quantity: product.length,
                updated_at: new Date(),
                created_at: new Date()
            });
            await this.cartRepository.update(entityCart);
        }
        return { success: true };
    }
    async delete(uuid, user_uuid) {
        const deleteProduct = await this.cartRepository.delete(uuid, user_uuid);
        if (!deleteProduct)
            throw new errors_1.ErrorNotFound('Data not found', '@Service Cart Delete');
        const searchMyCart = await this.cartRepository.findOneMyCart(user_uuid);
        if (!searchMyCart)
            throw new errors_1.ErrorNotFound('data not found', '@Service Delete Cart');
        const searchCart = await this.cartRepository.update(searchMyCart);
        return { success: true };
    }
    async minusQuantity(uuid, user_uuid) {
        const searchCart = await this.cartRepository.findOneMyCart(user_uuid);
        const searchUser = await this.profileService.findOne(user_uuid);
        if (!searchCart)
            throw new errors_1.ErrorNotFound('You did\'t have a cart', '@Service Minus Quantity Cart');
        let product = [];
        const searchProduct = await this.productService.findOne(uuid);
        if (!searchProduct)
            throw new errors_1.ErrorNotFound('Product not found', '@Service create or update cart');
        for (let i = 0; i < searchCart.product.length; i++) {
            if (searchCart.product[i].product_uuid === uuid) {
                await this.cartRepository.delete(searchCart.product[i].uuid ?? '', user_uuid);
                searchCart.product[i].quantity -= 1;
                searchCart.quantity = searchCart.product[i].quantity;
                return await this.cartRepository.update(searchCart);
            }
        }
        product.push({
            uuid: (0, uuid_1.v4)(),
            name: searchProduct?.name ?? '',
            image: searchProduct?.image ?? '',
            price: searchProduct?.price ?? 0,
            product_uuid: searchProduct?.uuid ?? '',
            seller_by: searchProduct?.created_by ?? {},
            slug: searchProduct?.slug ?? '',
            stock: searchProduct?.stock ?? 0,
            quantity: 1
        });
        let concat = searchCart.product.concat(product);
        let entityCart = new cart_1.default({
            uuid: searchCart.uuid,
            created_by: {
                uuid: searchUser?.created_by.uuid,
                name: searchUser?.created_by.name,
                image: searchUser?.image
            },
            product: concat,
            deleted_at: null,
            quantity: product.length,
            updated_at: new Date(),
            created_at: new Date()
        });
        await this.cartRepository.update(entityCart);
        return { success: true };
    }
    async findOne(uuid, user_uuid) {
        const result = await this.cartRepository.findOne(uuid, user_uuid);
        return result ? new cart_1.default(result) : null;
    }
    async findAll(user_uuid) {
        return await this.cartRepository.findAll(user_uuid);
    }
    async findOneMyCart(user_uuid) {
        const cart = await this.cartRepository.findOneMyCart(user_uuid);
        return cart ? new cart_1.default(cart) : null;
    }
};
CartService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CartRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ProductService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ProfileService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.ProducerDispatcher))
], CartService);
exports.default = CartService;
