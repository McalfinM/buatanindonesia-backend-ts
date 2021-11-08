"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetPaymentRequest {
    _no_invoice;
    _name;
    _delivery_date;
    _product_uuid;
    _status;
    _sort_by;
    _user_uuid;
    _page;
    _limit;
    _search;
    constructor(queryParams) {
        this._no_invoice = queryParams.no_invoice;
        this._name = queryParams.name;
        this._delivery_date = queryParams.delivery_date;
        this._product_uuid = queryParams.product_uuid;
        this._status = queryParams.status;
        this._sort_by = queryParams.sort_by;
        this._user_uuid = queryParams.user_uuid;
        this._page = queryParams.page;
        this._limit = queryParams.limit;
        this._search = queryParams.search;
    }
    get search() {
        return this._search;
    }
    get delivery_date() {
        return this._delivery_date;
    }
    get no_invoice() {
        return this._no_invoice;
    }
    get name() {
        return this._name;
    }
    get status() {
        return this._name;
    }
    get sort_by() {
        return this._sort_by;
    }
    get user_uuid() {
        return this._user_uuid;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }
}
exports.default = GetPaymentRequest;
