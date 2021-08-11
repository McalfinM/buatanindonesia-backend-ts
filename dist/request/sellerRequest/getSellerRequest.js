"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetSellerRequest {
    _name;
    _email;
    _status;
    _card_holder_name;
    _sort_by;
    _page;
    _limit;
    _search;
    constructor(queryParams) {
        this._name = queryParams.name;
        this._email = queryParams.email;
        this._status = queryParams.status;
        this._card_holder_name = queryParams.card_holder_name;
        this._sort_by = queryParams.sort_by;
        this._page = queryParams.page;
        this._limit = queryParams.limit;
        this._search = queryParams.search;
    }
    get search() {
        return this._search;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get status() {
        return this._status;
    }
    get card_holder_name() {
        return this._card_holder_name;
    }
    get sort_by() {
        return this._sort_by;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
}
exports.default = GetSellerRequest;
