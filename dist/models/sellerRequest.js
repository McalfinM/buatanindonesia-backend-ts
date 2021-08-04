"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SellerRequest = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    email: { type: String },
    card_holder_name: { type: String },
    image: { type: String },
    status: { type: String },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
SellerRequest.index('uuid');
const SellerModel = mongoose_1.model("SellerRequest", SellerRequest);
exports.default = SellerModel;
