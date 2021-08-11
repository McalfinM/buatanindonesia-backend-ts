"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class SellerRequestEntity extends baseEntity_1.default {
    _uuid;
    _name;
    _created_by;
    _bank;
    _email;
    _card_holder_name;
    _card_number;
    _image;
    _status;
    _phone;
    _ktp_image;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._created_by = params.created_by;
        this._email = params.email;
        this._card_holder_name = params.card_holder_name;
        this._image = params.image;
        this._card_number = params.card_number;
        this._phone = params.phone;
        this._status = params.status;
        this._name = params.name;
        this._ktp_image = params.ktp_image;
        this._bank = params.bank;
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
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get ktp_image() {
        return this._ktp_image;
    }
    set ktp_image(ktp_image) {
        this._ktp_image = ktp_image;
    }
    get card_holder_name() {
        return this._card_holder_name;
    }
    set card_holder_name(card_holder_name) {
        this._card_holder_name = card_holder_name;
    }
    get card_number() {
        return this._card_number;
    }
    set card_number(card_number) {
        this._card_number = card_number;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        this._phone = phone;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
    }
    get bank() {
        return this._bank;
    }
    set bank(bank) {
        this._bank = bank;
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
            name: this.name,
            created_by: this.created_by,
            bank: this.bank,
            email: this.email,
            card_holder_name: this.card_holder_name,
            card_number: this.card_number,
            image: this.image,
            status: this.status,
            phone: this.phone,
            ktp_image: this.ktp_image,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            image: this.image,
            status: this.status,
            created_at: this.created_at,
        };
    }
}
exports.default = SellerRequestEntity;
