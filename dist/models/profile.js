"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProfileSchema = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    slug: { type: String },
    address: { type: String },
    card_number: { type: String },
    province: { type: Object },
    city: { type: Object },
    district: { type: Object },
    village: { type: Object },
    phone: { type: String },
    bank: { type: Object },
    email: { type: String },
    image: { type: String },
    roles: { type: Array },
    is_active: { type: Boolean },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
ProfileSchema.index('user_uuid');
ProfileSchema.index('uuid');
const ProfileModel = (0, mongoose_1.model)("profiles", ProfileSchema);
exports.default = ProfileModel;
