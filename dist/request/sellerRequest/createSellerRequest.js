"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateSellerRequest {
    _name;
    _ktp_image;
    _card_holder_name;
    _card_number;
    _bank_uuid;
    _image;
    _phone;
    constructor(body) {
        this._name = body.name;
        this._ktp_image = body.ktp_image;
        this._card_holder_name = body.card_holder_name;
        this._card_number = body.card_number;
        this._image = body.image;
        this._phone = body.phone;
        this._bank_uuid = body.bank_uuid;
    }
    get name() {
        return this._name;
    }
    get ktp_image() {
        return this._ktp_image;
    }
    get card_holder_name() {
        return this._card_holder_name;
    }
    get card_number() {
        return this._card_number;
    }
    get image() {
        return this._image;
    }
    get phone() {
        return this._phone;
    }
    get bank_uuid() {
        return this._bank_uuid;
    }
}
exports.default = CreateSellerRequest;
