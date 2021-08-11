"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetSellerRequestSpecification {
    _card_holder_name;
    _name;
    _email;
    _status;
    _sort_by;
    _roles;
    _page;
    _limit;
    _search;
    constructor(request) {
        this._search = request.search;
        this._email = request.email;
        this._name = request.name;
        this._status = request.status;
        this._roles = request.roles ?? ['member'];
        this._sort_by = request.sort ?? '-created_at';
        this._page = request.page ?? 1;
        this._limit = request.limit ?? 30;
    }
    specifies() {
        let specifications = {};
        let or_specifications = [];
        if (this._search) {
            or_specifications.push({ 'email': new RegExp(this._search, 'i') }, { 'created_by.name': new RegExp(this._search, 'i') });
        }
        if (this._status) {
            specifications["status"] = this._status;
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
exports.default = GetSellerRequestSpecification;
