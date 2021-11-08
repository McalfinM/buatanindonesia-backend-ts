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
let ProvinceController = class ProvinceController {
    provinceService;
    constructor(provinceService) {
        this.provinceService = provinceService;
    }
    findOne(req, res) {
        const { params: { uuid } } = req;
        return this.provinceService.findOne(uuid)
            .then((result) => httpResponse_1.default.success(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
    async findAll(req, res) {
        const { query } = req;
        return this.provinceService.findAll(query)
            .then((result) => httpResponse_1.default.success(req, res, result))
            .catch((err) => (0, errors_1.HttpErrorHandler)(err, req, res));
    }
};
ProvinceController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ProvinceService))
], ProvinceController);
exports.default = ProvinceController;
