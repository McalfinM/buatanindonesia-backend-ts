"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SellerRequest = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    email: { type: String },
    bank: { type: Object },
    card_holder_name: { type: String },
    phone: { type: String },
    image: { type: Array },
    ktp_image: { type: String },
    name: { type: String },
    status: { type: String },
    province: { type: Object },
    city: { type: Object },
    district: { type: Object },
    village: { type: Object },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
SellerRequest.index('uuid');
const SellerRequestModel = (0, mongoose_1.model)("Seller_Request", SellerRequest);
exports.default = SellerRequestModel;
