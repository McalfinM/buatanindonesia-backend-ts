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
    _province_uuid;
    _city_uuid;
    _district_uuid;
    _village_uuid;
    constructor(body) {
        this._name = body.name;
        this._ktp_image = body.ktp_image;
        this._card_holder_name = body.card_holder_name;
        this._card_number = body.card_number;
        this._image = body.image;
        this._phone = body.phone;
        this._bank_uuid = body.bank_uuid;
        this._province_uuid = body.province_uuid;
        this._city_uuid = body.city_uuid;
        this._district_uuid = body.district_uuid;
        this._village_uuid = body.village_uuid;
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
    get province_uuid() {
        return this._province_uuid;
    }
    set province_uuid(province_uuid) {
        this._province_uuid = province_uuid;
    }
    get city_uuid() {
        return this._city_uuid;
    }
    set city_uuid(city_uuid) {
        this._city_uuid = city_uuid;
    }
    get district_uuid() {
        return this._district_uuid;
    }
    set district_uuid(district_uuid) {
        this._district_uuid = district_uuid;
    }
    get village_uuid() {
        return this._village_uuid;
    }
    set village_uuid(village_uuid) {
        this._village_uuid = village_uuid;
    }
}
exports.default = CreateSellerRequest;
