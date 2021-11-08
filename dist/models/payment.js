"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    uuid: { type: String },
    no_invoice: { type: String },
    address: { type: String },
    delivery_date: { type: String },
    phone: { type: String },
    email: { type: String },
    notes: { type: String },
    payment_method: { type: String },
    card_number: { type: String },
    idempotency: { type: String },
    created_by: { type: Object },
    seller_by: { type: Object },
    status: { type: String },
    card_name: { type: String },
    quantity: { type: Number },
    product: { type: Object },
    total_price: { type: Number },
    image: { type: String },
    status_payment: { type: String },
    macaddress: { type: String },
    cloudinary_id: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
PaymentSchema.index('uuid');
PaymentSchema.index('payment_method');
const PaymentModel = (0, mongoose_1.model)("payments", PaymentSchema);
exports.default = PaymentModel;
