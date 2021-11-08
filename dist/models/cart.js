"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    quantity: { type: Number },
    product: { type: Array },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
CartSchema.index('uuid');
CartSchema.index('created_by');
const CartModel = (0, mongoose_1.model)("cart", CartSchema);
exports.default = CartModel;
