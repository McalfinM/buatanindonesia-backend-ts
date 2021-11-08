"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    uuid: { type: String },
    name: { type: String },
});
CategorySchema.index('uuid');
const CategoryModel = (0, mongoose_1.model)("categories", CategorySchema);
exports.default = CategoryModel;
