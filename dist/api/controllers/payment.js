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
const httpResponse_1 = __importDefault(require("../../helpers/httpResponse"));
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const errors_1 = require("../../helpers/errors");
const CreatePaymentRequest_1 = __importDefault(require("../../request/payment/CreatePaymentRequest"));
const getPaymentRequest_1 = __importDefault(require("../../request/payment/getPaymentRequest"));
const mac = require('node-macaddress');
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    create(req, res) {
        const user = req.user;
        return this.paymentService.create(new CreatePaymentRequest_1.default(req.body), user)
            .then((result) => httpResponse_1.default.created(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    createNonAuth(req, res) {
        const user = req.user;
        let macaddress = "";
        mac.one(function (err, mac) {
            macaddress = mac;
        });
        return this.paymentService.createNonAuth(new CreatePaymentRequest_1.default(req.body), user, macaddress)
            .then((result) => httpResponse_1.default.created(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    findOne(req, res) {
        const { params: { uuid } } = req;
        const user = req.user;
        console.log(uuid);
        return this.paymentService.findOne(uuid, user.uuid)
            .then((result) => httpResponse_1.default.success(req, res, result?.toDetailData()))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    index(req, res) {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal = page?.toString() ?? "1";
        const limitVal = limit?.toString() ?? "30";
        const user = req.user;
        return this.paymentService.index(new getPaymentRequest_1.default(query), user)
            .then((result) => {
            res.setHeader("X-Pagination-Total-Page", Math.ceil(result.total / +limitVal));
            res.setHeader("X-Pagination-Total-Data", result.total || 0);
            res.setHeader("X-Pagination-Current-Page", pageVal);
            res.setHeader("X-Pagination-Limit", limitVal);
            const sellerRequest = result.data.map((data) => data.toListData());
            return httpResponse_1.default.success(req, res, sellerRequest);
        })
            .catch(err => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    uploadPayment(req, res) {
        const user = req.user;
        const { params: { uuid } } = req;
        const { body: { image, cloudinary_id } } = req;
        return this.paymentService.uploadPayment(uuid, image, user.uuid)
            .then(result => {
            return httpResponse_1.default.success(req, res, { success: true });
        }).catch(err => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    confirmItemDelivery(req, res) {
        const user = req.user;
        const { params: { uuid } } = req;
        const { body: { image, cloudinary_id } } = req;
        return this.paymentService.confirmItemDelivery(uuid, user.uuid)
            .then(result => {
            return httpResponse_1.default.success(req, res, { success: true });
        }).catch(err => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    findAllBySellerUuid(req, res) {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal = page?.toString() ?? "1";
        const limitVal = limit?.toString() ?? "30";
        const user = req.user;
        return this.paymentService.indexSeller(new getPaymentRequest_1.default(query), user)
            .then((result) => {
            res.setHeader("X-Pagination-Total-Page", Math.ceil(result.total / +limitVal));
            res.setHeader("X-Pagination-Total-Data", result.total || 0);
            res.setHeader("X-Pagination-Current-Page", pageVal);
            res.setHeader("X-Pagination-Limit", limitVal);
            const sellerRequest = result.data.map((data) => data.toListData());
            return httpResponse_1.default.success(req, res, sellerRequest);
        })
            .catch(err => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    confirmItemOngoing(req, res) {
        const user = req.user;
        const { params: { uuid } } = req;
        return this.paymentService.confirmItemOngoing(uuid, user.uuid)
            .then(result => {
            return httpResponse_1.default.success(req, res, { success: true });
        }).catch(err => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
};
PaymentController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.PaymentService))
], PaymentController);
exports.default = PaymentController;
