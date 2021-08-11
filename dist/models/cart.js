"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    order_id: { type: String },
    quantity: { type: Number },
    product: { type: Array },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
CartSchema.index('uuid');
CartSchema.index('order_id');
CartSchema.index('created_by');
const CartModel = mongoose_1.model("cart", CartSchema);
exports.default = CartModel;
