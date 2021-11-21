"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetProductRequest {
    _name;
    _price;
    _city_uuid;
    _user_uuid;
    _sort_by;
    _page;
    _limit;
    _search;
    _is_active;
    constructor(queryParams) {
        this._name = queryParams.name;
        this._price = queryParams.price;
        this._city_uuid = queryParams.city_uuid;
        this._user_uuid = queryParams.user_uuid;
        this._sort_by = queryParams.sort_by;
        this._page = queryParams.page;
        this._limit = queryParams.limit;
        this._search = queryParams.search;
        this._is_active = queryParams.is_active;
    }
    get search() {
        return this._search;
    }
    get name() {
        return this._name;
    }
    get price() {
        return this._price;
    }
    get city_uuid() {
        return this._city_uuid;
    }
    get user_uuid() {
        return this._user_uuid;
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
    get is_active() {
        return this._is_active;
    }
}
exports.default = GetProductRequest;
