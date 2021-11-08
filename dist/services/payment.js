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
const enum_1 = require("../entities/enums/enum");
let PaymentService = class PaymentService {
    paymentRepository;
    profileService;
    productService;
    cartService;
    dispatcher;
    constructor(paymentRepository, profileService, productService, cartService, dispatcher) {
        this.paymentRepository = paymentRepository;
        this.profileService = profileService;
        this.productService = productService;
        this.cartService = cartService;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        const searchUser = await this.profileService.findOne(user.uuid);
        if (!searchUser)
            throw new errors_1.ErrorNotFound('User not found', '@Service Payment Service create');
        const payment = await this.paymentRepository.findPaymentStillNoPay(user.uuid);
        if (payment?.status_payment == enum_1.StatusPayment.AWAITINGPAYMENT && payment.payment_method == enum_1.PaymentMethod.BANKTRANSFER) {
            throw new errors_1.ErrorBadRequest('Kamu masih mempunyai barang yang menunggu untuk di bayar', '@Service Payment => Create');
        }
        else if (payment?.status_payment == enum_1.StatusPayment.AWAITINGPAYMENT && payment.status == enum_1.StatusOrder.ORDER) {
            throw new errors_1.ErrorBadRequest('Kamu masih mempunyai barang COD untuk di bayar', '@Service Payment => Create');
        }
        const searchProduct = await this.productService.findOne(data.id);
        if (!searchProduct)
            throw new errors_1.ErrorNotFound('Product not found', '@Service Payment Service create');
        if (searchProduct.stock == 0)
            throw new errors_1.ErrorNotFound('Maaf produk telah habis', '@Service Payment create');
        const searchSeller = await this.profileService.findOne(searchProduct?.created_by.uuid ?? '');
        if (!searchSeller)
            throw new errors_1.ErrorNotFound('Seller maybe not active now', '@Service payment service create');
        if (searchUser.created_by.uuid == searchSeller.created_by.uuid)
            throw new errors_1.ErrorNotFound('Cant continue this transaction', '@Service create payment');
        const paymentEntity = new payment_1.default({
            uuid: (0, uuid_1.v4)(),
            no_invoice: 'MS' + Math.random().toString(20).substring(2, 10),
            address: data.address,
            delivery_date: data.delivery_date,
            phone: data.phone,
            email: data.email ?? searchUser.email,
            notes: data.notes ?? null,
            payment_method: data.payment_method,
            card_number: data.card_number ?? null,
            idempotency: data.idempotency ?? '',
            created_by: {
                uuid: searchUser.created_by.uuid,
                image: searchUser.image,
                name: searchUser.created_by.name
            } ?? null,
            seller_by: {
                uuid: searchSeller.created_by.uuid,
                name: searchSeller.created_by.name,
                image: searchSeller.image
            },
            status: enum_1.StatusOrder.ORDER,
            status_payment: enum_1.StatusPayment.AWAITINGPAYMENT,
            card_name: data.card_name ?? null,
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
            image: data.image ?? '',
            macaddress: null,
            cloudinary_id: data.cloudinary_id ?? null,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        });
        await this.paymentRepository.create(paymentEntity);
        return { success: true };
    }
    async createNonAuth(data, user, macaddress) {
        const searchProduct = await this.productService.findOne(data.id);
        if (!searchProduct)
            throw new errors_1.ErrorNotFound('Product not found', '@Service Payment Service create');
        if (searchProduct.stock == 0)
            throw new errors_1.ErrorNotFound('Maaf produk telah habis', '@Service Payment create');
        const searchSeller = await this.profileService.findOne(searchProduct?.created_by.uuid ?? '');
        if (!searchSeller)
            throw new errors_1.ErrorNotFound('Seller maybe not active now', '@Service payment service create');
        const paymentEntity = new payment_1.default({
            uuid: (0, uuid_1.v4)(),
            no_invoice: 'MS' + Math.random().toString(20).substring(2, 10),
            address: data.address,
            delivery_date: data.delivery_date,
            phone: data.phone,
            email: data.email,
            notes: data.notes ?? null,
            payment_method: data.payment_method,
            card_number: data.card_number ?? null,
            idempotency: data.idempotency ?? '',
            created_by: {} ?? null,
            seller_by: {
                uuid: searchSeller.uuid,
                name: searchSeller.created_by.name,
                image: searchSeller.image
            },
            status: enum_1.StatusOrder.ORDER,
            card_name: data.card_name ?? null,
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
            image: data.image ?? '',
            status_payment: enum_1.StatusPayment.AWAITINGPAYMENT,
            cloudinary_id: data.cloudinary_id ?? null,
            macaddress: macaddress,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        });
        await this.paymentRepository.create(paymentEntity);
        return { success: true };
    }
    async findOne(uuid, user_uuid) {
        console.log(uuid);
        const result = await this.paymentRepository.findOneByNoInvoice(uuid, user_uuid);
        return result;
    }
    async index(data, user) {
        return await this.paymentRepository.findAll(new paymentSpecification_1.default({
            invoice: data.no_invoice,
            name: data.name,
            search: data.search,
            limit: data.limit,
            page: data.page,
            sort: data.sort_by,
            user: user,
        }));
    }
    async uploadPayment(uuid, image, user_uuid) {
        const payment = await this.paymentRepository.findOne(uuid, user_uuid);
        if (!payment)
            throw new errors_1.ErrorNotFound('Data tidak ditemukan', '@Service Payment => uploadPayment');
        const entity = new payment_1.default({
            ...payment.toJSON(),
            image: image,
            status_payment: enum_1.StatusPayment.VALIDATIONPROCESS
        });
        await this.paymentRepository.update(entity);
    }
    async confirmItemDelivery(uuid, user_uuid) {
        const payment = await this.paymentRepository.findOne(uuid, user_uuid);
        if (!payment)
            throw new errors_1.ErrorNotFound('Data tidak ditemukan', '@Service Payment => uploadPayment');
        const entity = new payment_1.default({
            ...payment.toJSON(),
            status_payment: enum_1.StatusPayment.PAID,
            status: enum_1.StatusOrder.DONE
        });
        await this.paymentRepository.update(entity);
    }
    async confirmItemOngoing(uuid, user_uuid) {
        const payment = await this.paymentRepository.findOneSeller(uuid, user_uuid);
        if (!payment)
            throw new errors_1.ErrorNotFound('Data tidak ditemukan', '@Service Payment => uploadPayment');
        const entity = new payment_1.default({
            ...payment.toJSON(),
            status: enum_1.StatusOrder.ONGOING
        });
        await this.paymentRepository.update(entity);
    }
    async indexSeller(data, user) {
        const place = 'seller';
        return await this.paymentRepository.findAll(new paymentSpecification_1.default({
            invoice: data.no_invoice,
            name: data.name,
            search: data.search,
            limit: data.limit,
            page: data.page,
            sort: data.sort_by,
            user: user,
            place: place
        }));
    }
};
PaymentService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PaymentRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ProfileService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ProductService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.CartService)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.ProducerDispatcher))
], PaymentService);
exports.default = PaymentService;
