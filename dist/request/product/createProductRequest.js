"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateProductRequest {
    _name;
    _description;
    _category_uuid;
    _price;
    _stock;
    _image;
    _cloudinary_id;
    constructor(body) {
        this._name = body.name;
        this._description = body.description;
        this._price = body.price;
        this._stock = body.stock;
        this._image = body.image;
        this._category_uuid = body.category_uuid;
        this._cloudinary_id = body.cloudinary_id;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get price() {
        return this._price;
    }
    get stock() {
        return this._stock;
    }
    get image() {
        return this._image;
    }
    get cloudinary_id() {
        return this._cloudinary_id;
    }
    get category_uuid() {
        return this._category_uuid;
    }
}
exports.default = CreateProductRequest;
