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
const cart_1 = __importDefault(require("../../request/cart/cart"));
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    createOrUpdate(req, res) {
        const user = req.user;
        return this.cartService.createOrUpdate(new cart_1.default(req.body), user)
            .then((result) => {
            return httpResponse_1.default.created(req, res, result);
        })
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    findOne(req, res) {
        const { params: { uuid } } = req;
        const user = req.user;
        return this.cartService.findOne(uuid, user.uuid)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    delete(req, res) {
        const { params: { uuid } } = req;
        const user = req.user;
        return this.cartService.delete(uuid, user.uuid)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    findAll(req, res) {
        const user = req.user;
        return this.cartService.findAll(user.uuid)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    minusQuantity(req, res) {
        const user = req.user;
        const { params: { uuid } } = req;
        return this.cartService.minusQuantity(uuid, user.uuid)
            .then((result) => {
            return httpResponse_1.default.success(req, res, result);
        })
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
};
CartController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.CartService))
], CartController);
exports.default = CartController;
