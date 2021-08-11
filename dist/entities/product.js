"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class ProductEntity extends baseEntity_1.default {
    _uuid;
    _created_by;
    _name;
    _slug;
    _description;
    _price;
    _stock;
    _image;
    _cloudinary_id;
    _is_active;
    _category;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._created_by = params.created_by;
        this._name = params.name;
        this._slug = params.slug;
        this._description = params.description;
        this._price = params.price;
        this._stock = params.stock;
        this._image = params.image;
        this._cloudinary_id = params.cloudinary_id;
        this._is_active = params.is_active;
        this._category = params.category;
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
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get slug() {
        return this._slug;
    }
    set slug(slug) {
        this._slug = slug;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get cloudinary_id() {
        return this._cloudinary_id;
    }
    set cloudinary_id(cloudinary_id) {
        this._cloudinary_id = cloudinary_id;
    }
    get price() {
        return this._price;
    }
    set price(price) {
        this._price = price;
    }
    get stock() {
        return this._stock;
    }
    set stock(stock) {
        this._stock = stock;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get is_active() {
        return this._is_active;
    }
    set is_active(is_active) {
        this._is_active = is_active;
    }
    get category() {
        return this._category;
    }
    set category(category) {
        this._category = category;
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
            name: this.name,
            slug: this.slug,
            description: this.description,
            price: this.price,
            stock: this.stock,
            image: this.image,
            cloudinary_id: this.cloudinary_id,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            created_by: this.created_by,
            name: this.name,
            slug: this.slug,
            price: this.price,
            stock: this.stock,
            image: this.image,
        };
    }
    toDetailData() {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            name: this.name,
            slug: this.slug,
            description: this.description,
            price: this.price,
            stock: this.stock,
            image: this.image,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
exports.default = ProductEntity;
