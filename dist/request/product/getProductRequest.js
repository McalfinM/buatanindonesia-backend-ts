"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetProductRequest {
    _name;
    _price;
    _stock;
    _sort_by;
    _page;
    _limit;
    _search;
    constructor(queryParams) {
        this._name = queryParams.name;
        this._price = queryParams.price;
        this._stock = queryParams.stock;
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
    get price() {
        return this._price;
    }
    get stock() {
        return this._stock;
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
exports.default = GetProductRequest;
