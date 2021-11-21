"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateSellerRequest {
    _name;
    _ktp_image;
    _bank_uuid;
    _image;
    _phone;
    _address;
    _province_uuid;
    _city_uuid;
    _district_uuid;
    _village_uuid;
    constructor(body) {
        this._name = body.name;
        this._ktp_image = body.ktp_image;
        this._image = body.image;
        this._phone = body.phone;
        this._address = body.address;
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
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
}
exports.default = CreateSellerRequest;
