"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class ProvinceEntity extends baseEntity_1.default {
    _uuid;
    _created_by;
    _email;
    _card_holder_name;
    _image;
    _status;
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
        this._status = params.status;
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
    get card_holder_name() {
        return this._card_holder_name;
    }
    set card_holder_name(card_holder_name) {
        this._card_holder_name = card_holder_name;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
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
            email: this.email,
            card_holder_name: this.card_holder_name,
            image: this.image,
            status: this.status,
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
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}
exports.default = ProvinceEntity;
