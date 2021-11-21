"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetProductSpecificationWithAuth {
    _name;
    _city;
    _price;
    _sort_by;
    _page;
    _limit;
    _search;
    _user_uuid;
    _is_active;
    constructor(request) {
        this._search = request.search;
        this._city = request.city;
        this._name = request.name;
        this._price = request.price;
        this._sort_by = request.sort ?? '-created_at';
        this._page = request.page ?? 1;
        this._limit = request.limit ?? 30;
        this._user_uuid = request.user_uuid;
        this._is_active = request.is_active ?? true;
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
        if (this._city) {
            specifications["city.uuid"] = this._city;
        }
        if (or_specifications.length > 0) {
            specifications["$or"] = or_specifications;
        }
        specifications.deleted_at = null;
        specifications.is_active = this._is_active;
        specifications['created_by.uuid'] = this._user_uuid;
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
exports.default = GetProductSpecificationWithAuth;
