"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class CartEntity extends baseEntity_1.default {
    _uuid;
    _created_by;
    _quantity;
    _product;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._created_by = params.created_by;
        this._quantity = params.quantity;
        this._product = params.product;
        this._created_at = params.created_at;
        this._updated_at = params.updated_at;
        this._deleted_at = params.deleted_at;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get created_by() {
        return this._created_by;
    }
    set created_by(created_by) {
        this._created_by = created_by;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(quantity) {
        this._quantity = quantity;
    }
    get product() {
        return this._product;
    }
    set product(product) {
        this._product = product;
    }
    get created_at() {
        return this._created_at;
    }
    set created_at(created_at) {
        this._created_at = created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
    set updated_at(updated_at) {
        this._updated_at = updated_at;
    }
    get deleted_at() {
        return this._deleted_at;
    }
    set deleted_at(deleted_at) {
        this._deleted_at = deleted_at;
    }
    toJson() {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            quantity: this.quantity,
            product: this.product,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            quantity: this.quantity,
            product: this.product,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
exports.default = CartEntity;
