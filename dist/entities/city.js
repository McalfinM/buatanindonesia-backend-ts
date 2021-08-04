"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class CityEntity extends baseEntity_1.default {
    _uuid;
    _province_uuid;
    _name;
    _code;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._name = params.name;
        this._province_uuid = params.province_uuid;
        this._code = params.code;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get province_uuid() {
        return this._province_uuid;
    }
    set province_uuid(province_uuid) {
        this._province_uuid = province_uuid;
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
    toJson() {
        return {
            uuid: this.uuid,
            province_uuid: this.province_uuid,
            name: this.name,
            code: this.code
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            province_uuid: this.province_uuid,
            name: this.name,
            code: this.code
        };
    }
}
exports.default = CityEntity;
