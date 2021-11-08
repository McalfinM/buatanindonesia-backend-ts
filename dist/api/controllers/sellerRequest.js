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
const createSellerRequest_1 = __importDefault(require("../../request/sellerRequest/createSellerRequest"));
const getSellerRequest_1 = __importDefault(require("../../request/sellerRequest/getSellerRequest"));
let SellerRequestController = class SellerRequestController {
    sellerRequestService;
    constructor(sellerRequestService) {
        this.sellerRequestService = sellerRequestService;
    }
    create(req, res) {
        const user = req.user;
        return this.sellerRequestService.create(new createSellerRequest_1.default(req.body), user)
            .then((result) => httpResponse_1.default.created(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    update(req, res) {
        const user = req.user;
        const { params: { uuid } } = req;
        return this.sellerRequestService.update(uuid, new createSellerRequest_1.default(req.body), user)
            .then((result) => httpResponse_1.default.success(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    findOne(req, res) {
        const { params: { uuid } } = req;
        return this.sellerRequestService.findOne(uuid)
            .then((result) => httpResponse_1.default.success(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    index(req, res) {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal = page?.toString() ?? "1";
        const limitVal = limit?.toString() ?? "30";
        return this.sellerRequestService.index(new getSellerRequest_1.default(query))
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
    UpdateToSeller(req, res) {
        const { params: { uuid } } = req;
        return this.sellerRequestService.updateToSeller(uuid)
            .then((result) => httpResponse_1.default.success(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    delete(req, res) {
        const { params: { uuid } } = req;
        const user = req.user;
        return this.sellerRequestService.delete(uuid, user.uuid)
            .then((result) => httpResponse_1.default.success(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
};
SellerRequestController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.SellerRequestService))
], SellerRequestController);
exports.default = SellerRequestController;
