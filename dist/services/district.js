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
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../types");
let DistrictService = class DistrictService {
    districtRepository;
    dispatcher;
    constructor(districtRepository, dispatcher) {
        this.districtRepository = districtRepository;
        this.dispatcher = dispatcher;
    }
    async findOne(uuid) {
        const provinceData = await this.districtRepository.findOne(uuid);
        return provinceData;
    }
    async findAll(query = {}) {
        const data = await this.districtRepository.findAll(query);
        return data;
    }
};
DistrictService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.DistrictRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ProducerDispatcher))
], DistrictService);
exports.default = DistrictService;
