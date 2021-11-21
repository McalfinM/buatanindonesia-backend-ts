"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateUserRequest {
    _uuid;
    _name;
    _email;
    _password;
    _confirm_password;
    _phone;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(body) {
        this._uuid = body.uuid;
        this._name = body.name;
        this._email = body.email;
        this._password = body.password;
        this._confirm_password = body.confirm_password;
        this._phone = body.phone;
        this._created_at = body.created_at;
        this._updated_at = body.updated_at;
        this._deleted_at = body.deleted_at;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
    get confirm_password() {
        return this._confirm_password;
    }
    get phone() {
        return this._phone;
    }
    get created_at() {
        return this._created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
    get deleted_at() {
        return this._deleted_at;
    }
}
exports.default = CreateUserRequest;
