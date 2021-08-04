"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    slug: { type: String },
    address: { type: String },
    card_number: { type: String },
    province_uuid: { type: String },
    city_uuid: { type: String },
    district_uuid: { type: String },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
    roles: { type: Array },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
ProfileSchema.index('user_uuid');
ProfileSchema.index('uuid');
const ProfileModel = mongoose_1.model("profiles", ProfileSchema);
exports.default = ProfileModel;
