"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class VillageEntity extends baseEntity_1.default {
    _uuid;
    _district_uuid;
    _postal_code;
    _name;
    _code;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._name = params.name;
        this._district_uuid = params.district_uuid;
        this._postal_code = params.postal_code;
        this._code = params.code;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get district_uuid() {
        return this._district_uuid;
    }
    set district_uuid(district_uuid) {
        this._district_uuid = district_uuid;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get code() {
        return this._code;
    }
    set code(code) {
        this._code = code;
    }
    get postal_code() {
        return this._postal_code;
    }
    set postal_code(postal_code) {
        this._postal_code = postal_code;
    }
    toJson() {
        return {
            uuid: this.uuid,
            district_uuid: this.district_uuid,
            name: this.name,
            code: this.code
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            district_uuid: this.district_uuid,
            name: this.name,
            code: this.code
        };
    }
}
exports.default = VillageEntity;
