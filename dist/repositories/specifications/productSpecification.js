"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetProductSpecification {
    _name;
    _stock;
    _price;
    _city_uuid;
    _sort_by;
    _page;
    _limit;
    _search;
    _user;
    constructor(request) {
        this._search = request.search;
        this._stock = request.stock;
        this._name = request.name;
        this._price = request.price;
        this._city_uuid = request.city_uuid;
        this._sort_by = request.sort ?? '-created_at';
        this._page = request.page ?? 1;
        this._limit = request.limit ?? 30;
        this._user = request.user;
    }
    specifies() {
        let specifications = {};
        let or_specifications = [];
        if (this._search) {
            or_specifications.push({ 'name': new RegExp(this._search, 'i') });
        }
        if (this._price) {
            specifications["price"] = this._price;
        }
        if (this._stock) {
            specifications["stock"] = this._stock;
        }
        if (this._city_uuid) {
            specifications["city.uuid"] = this._city_uuid;
        }
        if (or_specifications.length > 0) {
            specifications["$or"] = or_specifications;
        }
        specifications.deleted_at = null;
        specifications.is_active = true;
        return specifications;
    }
    specSort() {
        let specifications = {};
        if (this._sort_by[0] == '-') {
            specifications[this._sort_by.slice(1)] = -1;
        }
        else {
            specifications[this._sort_by] = 1;
        }
        return specifications;
    }
    paginate() {
        const specification = {
            limit: +this._limit,
            skip: 0
        };
        if (this._page > 1) {
            specification.skip = (this._page - 1) * this._limit;
        }
        return specification;
    }
}
exports.default = GetProductSpecification;
