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
const product_1 = require("../validators/product/product");
const express_1 = require("express");
const requestValidation_1 = require("../../middlewares/requestValidation");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const auth_1 = require("../../middlewares/auth");
const multer_1 = __importDefault(require("../../helpers/multer"));
let ProductRouter = class ProductRouter extends baseRouter_1.default {
    productController;
    router;
    constructor(productController) {
        super();
        this.productController = productController;
        this.router = (0, express_1.Router)();
        this.bindings();
        this.routes();
    }
    routes() {
        // call controllers here
        this.router.get('/', this.productController.findAll);
        this.router.get('/my-products', auth_1.authenticate, this.productController.findAllWithUser);
        this.router.post('/', auth_1.authenticate, multer_1.default.single('image'), this.productController.create);
        this.router.get('/my-products/:uuid', this.productController.findAllWithUserNoAuth);
        this.router.put('/:uuid', auth_1.authenticate, (0, product_1.bodyValidation)(), requestValidation_1.validate, this.productController.update);
        this.router.get('/:uuid', this.productController.findOne);
        this.router.delete('/:uuid', auth_1.authenticate, this.productController.delete);
        return this;
    }
};
ProductRouter = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ProductController))
], ProductRouter);
exports.default = ProductRouter;
