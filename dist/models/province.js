"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProvinceSchema = new mongoose_1.Schema({
    uuid: { type: String },
    name: { type: String },
    code: { type: String },
});
ProvinceSchema.index('uuid');
const ProvinceModel = mongoose_1.model("provinces", ProvinceSchema);
exports.default = ProvinceModel;
