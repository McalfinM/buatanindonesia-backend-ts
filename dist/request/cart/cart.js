"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCartRequest {
    _product_uuid;
    constructor(body) {
        this._product_uuid = body.product_uuid;
    }
    get product_uuid() {
        return this._product_uuid;
    }
}
exports.default = CreateCartRequest;
