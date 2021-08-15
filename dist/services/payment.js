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
const payment_1 = __importDefault(require("../entities/payment"));
const paymentSpecification_1 = __importDefault(require("../repositories/specifications/paymentSpecification"));
let PaymentService = class PaymentService {
    paymentRepository;
    profileService;
    productService;
    dispatcher;
    constructor(paymentRepository, profileService, productService, dispatcher) {
        this.paymentRepository = paymentRepository;
        this.profileService = profileService;
        this.productService = productService;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        const searchUser = await this.profileService.findOne(user.uuid);
        const searchSeller = await this.profileService.findOne(data.seller_uuid);
        if (!searchSeller)
            throw new errors_1.ErrorNotFound('Seller maybe not active now', '@Service payment service create');
        if (!searchUser)
            throw new errors_1.ErrorNotFound('User not found', '@Service Payment Service create');
        if (searchUser.created_by.uuid == searchSeller.created_by.uuid)
            throw new errors_1.ErrorNotFound('Cant continue this transaction', '@Service create payment');
        const searchProduct = await this.productService.findOne(data.product_uuid);
        if (!searchProduct)
            throw new errors_1.ErrorNotFound('Product not found', '@Service Payment Service create');
        const paymentEntity = new payment_1.default({
            uuid: uuid_1.v4(),
            no_invoice: 'MS' + Math.random().toString(50).substring(2, 10),
            address: data.address,
            delivery_date: data.delivery_date,
            phone: data.phone,
            email: data.email,
            notes: data.notes,
            payment_method: data.payment_method,
            card_number: data.card_number ?? null,
            idempotency: data.idempotency ?? '',
            created_by: {
                uuid: searchUser.uuid,
                image: searchUser.image,
                name: searchUser.created_by.name
            } ?? null,
            seller_by: {
                uuid: searchSeller.uuid,
                name: searchSeller.created_by.name,
                image: searchSeller.image
            },
            status: data.status,
            card_name: data.card_name ?? '',
            quantity: data.quantity,
            product: {
                product_uuid: searchProduct.uuid,
                name: searchProduct.name,
                image: searchProduct.image,
                price: searchProduct.price,
                seller_by: {
                    uuid: searchSeller.uuid,
                    name: searchSeller.created_by.name,
                    image: searchSeller.image
                },
                slug: searchProduct.slug,
                quantity: searchProduct.stock
            },
            total_price: data.total_price ?? 0,
            image: data.image ?? 'https://res.cloudinary.com/dti2eqvdi/image/upload/v1627998960/profile/No_Image_Available_kvppd7.jpg',
            cloudinary_id: data.cloudinary_id ?? null,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        });
        return { success: true };
    }
    async findOne(uuid, user_uuid) {
        const result = await this.paymentRepository.findOne(uuid, user_uuid);
        return result;
    }
    async index(data) {
        return await this.paymentRepository.findAll(new paymentSpecification_1.default(data));
    }
};
PaymentService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.PaymentRepository)),
    __param(1, inversify_1.inject(types_1.TYPES.ProfileService)),
    __param(2, inversify_1.inject(types_1.TYPES.ProductService)),
    __param(3, inversify_1.inject(types_1.TYPES.ProducerDispatcher))
], PaymentService);
exports.default = PaymentService;
