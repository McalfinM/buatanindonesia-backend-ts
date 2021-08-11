"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateProfileRequest {
    _name;
    _address;
    _card_number;
    _province_uuid;
    _city_uuid;
    _district_uuid;
    _village_uuid;
    _bank_uuid;
    _phone;
    _email;
    _image;
    _cloudinary_id;
    constructor(body) {
        this._name = body.name;
        this._address = body.address;
        this._card_number = body.card_number;
        this._province_uuid = body.province_uuid;
        this._city_uuid = body.city_uuid;
        this._district_uuid = body.district_uuid;
        this._village_uuid = body.village_uuid;
        this._phone = body.phone;
        this._email = body.email;
        this._image = body.image;
        this._cloudinary_id = body.cloudinary_id;
        this._bank_uuid = body.bank_uuid;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
    get card_number() {
        return this._card_number;
    }
    set card_number(card_number) {
        this._card_number = card_number;
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
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        this._phone = phone;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get cloudinary_id() {
        return this._cloudinary_id;
    }
    set cloudinary_id(cloudinary_id) {
        this._cloudinary_id = cloudinary_id;
    }
    get bank_uuid() {
        return this._bank_uuid;
    }
    set bank_uuid(bank_uuid) {
        this._bank_uuid = bank_uuid;
    }
}
exports.default = UpdateProfileRequest;
