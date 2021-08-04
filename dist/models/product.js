"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    uuid: { type: String },
    created_by: { type: Object },
    name: { type: String },
    slug: { type: String },
    description: { type: String },
    price: { type: Number },
    stock: { type: Number },
    image: { type: String },
    cloudinary_id: { type: String },
    is_active: { type: Boolean },
    created_at: { type: Date },
    updated_at: { type: Date },
    deleted_at: { type: Date },
});
ProductSchema.index('uuid');
ProductSchema.index('slug');
ProductSchema.index('name');
const ProductModel = mongoose_1.model("products", ProductSchema);
exports.default = ProductModel;
