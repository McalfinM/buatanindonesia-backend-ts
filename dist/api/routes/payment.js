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
const baseRouter_1 = __importDefault(require("./baseRouter"));
const payment_1 = require("../validators/payment/payment");
const express_1 = require("express");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const auth_1 = require("../../middlewares/auth");
const requestValidation_1 = require("../../middlewares/requestValidation");
let PaymentRouter = class PaymentRouter extends baseRouter_1.default {
    paymentControlelr;
    router;
    constructor(paymentControlelr) {
        super();
        this.paymentControlelr = paymentControlelr;
        this.router = (0, express_1.Router)();
        this.bindings();
        this.routes();
    }
    routes() {
        // call controllers here
        this.router.post('/', (0, payment_1.bodyValidation)(), requestValidation_1.validate, auth_1.authenticate, this.paymentControlelr.create);
        this.router.post('/buy', (0, payment_1.bodyValidation)(), requestValidation_1.validate, this.paymentControlelr.createNonAuth);
        this.router.get('/', auth_1.authenticate, this.paymentControlelr.index);
        this.router.get('/seller-bought', auth_1.authenticate, this.paymentControlelr.findAllBySellerUuid);
        this.router.get('/:uuid', auth_1.authenticate, this.paymentControlelr.findOne);
        this.router.patch('/:uuid/upload-payment', auth_1.authenticate, this.paymentControlelr.uploadPayment);
        this.router.patch('/:uuid/confirm-item-delivery', auth_1.authenticate, this.paymentControlelr.confirmItemDelivery);
        this.router.patch('/:uuid/confirm-item-ongoing', auth_1.authenticate, this.paymentControlelr.confirmItemOngoing);
        return this;
    }
};
PaymentRouter = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PaymentController))
], PaymentRouter);
exports.default = PaymentRouter;