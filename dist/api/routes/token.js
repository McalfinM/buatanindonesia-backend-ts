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
const express_1 = require("express");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const auth_1 = require("../../middlewares/auth");
let TokenRouter = class TokenRouter extends baseRouter_1.default {
    tokenController;
    router;
    constructor(tokenController) {
        super();
        this.tokenController = tokenController;
        this.router = express_1.Router();
        this.bindings();
        this.routes();
    }
    routes() {
        // call controllers here
        this.router.put('/:token/verification', this.tokenController.update);
        this.router.get('/:uuid', auth_1.authenticate, this.tokenController.findOne);
        this.router.delete('/:uuid', auth_1.authenticate, this.tokenController.findOneWithToken);
        return this;
    }
};
TokenRouter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.TokenController))
], TokenRouter);
exports.default = TokenRouter;
