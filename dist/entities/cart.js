"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class CartEntity extends baseEntity_1.default {
    _uuid;
    _created_by;
    _seller_by;
    _order_id;
    _quantity;
    _product;
    _price;
    _cloudinary_id;
    _is_active;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._created_by = params.created_by;
        this._seller_by = params.seller_by;
        this._order_id = params.order_id;
        this._quantity = params.quantity;
        this._product = params.product;
        this._price = params.price;
        this._cloudinary_id = params.cloudinary_id;
        this._is_active = params.is_active;
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
    get seller_by() {
        return this._seller_by;
    }
    set seller_by(seller_by) {
        this._seller_by = seller_by;
    }
    get order_id() {
        return this._order_id;
    }
    set order_id(order_id) {
        this._order_id = order_id;
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
    get price() {
        return this._price;
    }
    set price(price) {
        this._price = price;
    }
    get cloudinary_id() {
        return this._cloudinary_id;
    }
    set cloudinary_id(cloudinary_id) {
        this._cloudinary_id = cloudinary_id;
    }
    get is_active() {
        return this._is_active;
    }
    set is_active(is_active) {
        this._is_active = is_active;
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
            seller_by: this.seller_by,
            order_id: this.order_id,
            quantity: this.quantity,
            product: this.product,
            price: this.price,
            cloudinary_id: this.cloudinary_id,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            seller_by: this.seller_by,
            order_id: this.order_id,
            quantity: this.quantity,
            product: this.product,
            price: this.price,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
exports.default = CartEntity;
