"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const province_1 = __importDefault(require("../models/province"));
const inversify_1 = require("inversify");
const province_2 = __importDefault(require("../entities/province"));
let ProvinceRepository = class ProvinceRepository {
    // async create(provinceEntity: ProvinceEntity): Promise<IProvinces> {
    //     const document = {
    //         ...provinceEntity,
    //     } as IProvinces
    //     const createdDocument = {
    //         ...(await ProvinceModel.create(document)).toObject()
    //     } as IProvinces
    //     return document
    // }
    // async findById(uuid: string): Promise<IProvinces | null> {
    //     return await ProvinceModel.findOne({
    //         uuid: uuid
    //     });
    // }
    async findOne(uuid) {
        const province = await province_1.default.findOne({ uuid: uuid });
        return province ? new province_2.default(province) : null;
    }
    // async update(provinceEntity: ProvinceEntity): Promise<IProvinces> {
    //     const filter = { uuid: provinceEntity.getUuid }
    //     const document = {
    //         uuid: provinceEntity.getUuid,
    //         code: provinceEntity.getCode,
    //         name: provinceEntity.getName,
    //         updated_at: new Date(),
    //     } as IProvinces
    //     await ProvinceModel.updateOne(filter, document)
    //     return document
    // }
    async findAll(query) {
        const { page, limit, sort, ...rest } = query;
        // filter
        const queryVal = {};
        for (const key in rest) {
            if (Object.prototype.hasOwnProperty.call(rest, key)) {
                const element = rest[key];
                if (typeof element === 'object') {
                    for (const k in element) {
                        if (Object.prototype.hasOwnProperty.call(element, k)) {
                            queryVal[key] = { ['$' + k]: element[k] };
                        }
                    }
                }
                else {
                    queryVal[key] = new RegExp(rest[key], 'i');
                }
            }
        }
        // sort
        const sortVal = {};
        const sortArr = sort?.split(',');
        sortArr?.map(s => {
            const splitted = s?.split('.');
            sortVal[splitted[0]] = splitted[1].toUpperCase() == 'ASC' ? 1 : -1;
        });
        let options = {};
        // paginate
        if (limit) {
            // @ts-ignore
            options.limit = +limit;
        }
        if (page && limit) {
            if (+page > 1) {
                // @ts-ignore
                options.skip = (p + age - 1) * +limit;
            }
        }
        // @ts-ignore
        options.sort = sortVal;
        return province_1.default.find({ ...queryVal }, {}, options)
            .then(result => {
            return result.map(data => {
                return new province_2.default({
                    uuid: data.uuid,
                    name: data.name,
                    code: data.code,
                });
            });
        })
            .catch(err => {
            return err;
        });
    }
};
ProvinceRepository = __decorate([
    (0, inversify_1.injectable)()
], ProvinceRepository);
exports.default = ProvinceRepository;
