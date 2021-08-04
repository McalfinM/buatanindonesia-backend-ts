"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DistrictSchema = new mongoose_1.Schema({
    uuid: { type: String },
    city_uuid: { type: String },
    name: { type: String },
    code: { type: String },
});
DistrictSchema.index('uuid');
const DistrictModel = mongoose_1.model("district", DistrictSchema);
exports.default = DistrictModel;
