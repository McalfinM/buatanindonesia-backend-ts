"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class ProfileEntity extends baseEntity_1.default {
    _uuid;
    _created_by;
    _slug;
    _address;
    _card_number;
    _province;
    _city;
    _district;
    _village;
    _phone;
    _email;
    _image;
    _cloudinary_id;
    _roles;
    _bank;
    _is_active;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._created_by = params.created_by;
        this._slug = params.slug;
        this._address = params.address;
        this._card_number = params.card_number;
        this._province = params.province;
        this._city = params.city;
        this._district = params.district;
        this._village = params.village;
        this._cloudinary_id = params.cloudinary_id;
        this._phone = params.phone;
        this._email = params.email;
        this._image = params.image;
        this._roles = params.roles;
        this._bank = params.bank;
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
    get slug() {
        return this._slug;
    }
    set slug(slug) {
        this._slug = slug;
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
    get province() {
        return this._province;
    }
    set province(province) {
        this._province = province;
    }
    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }
    get district() {
        return this._district;
    }
    set district(district) {
        this._district = district;
    }
    get village() {
        return this._village;
    }
    set village(village) {
        this._village = village;
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
    get roles() {
        return this._roles;
    }
    set roles(roles) {
        this._roles = roles;
    }
    get bank() {
        return this._bank;
    }
    set bank(bank) {
        this._bank = bank;
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
            slug: this.slug,
            address: this.address,
            card_number: this.card_number,
            province: this.province,
            city: this.city,
            district: this.district,
            village: this.village,
            phone: this.phone,
            bank: this.bank,
            email: this.email,
            image: this.image,
            cloudinary_id: this.cloudinary_id,
            roles: this.roles,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
    toListData() {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            city: this.city,
            image: this.image,
            slug: this.slug
        };
    }
    toDetailData() {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            slug: this.slug,
            address: this.address,
            card_number: this.card_number,
            province: this.province,
            city: this.city,
            district: this.district,
            phone: this.phone,
            email: this.email,
            image: this.image,
            roles: this.roles,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
    toProfile() {
        return {
            uuid: this.uuid,
            name: this.created_by.name,
            city: this.city,
            image: this.image,
            email: this.email,
            phone: this.phone,
            roles: this.roles,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}
exports.default = ProfileEntity;
