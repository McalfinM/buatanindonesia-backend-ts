"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CitySchema = new mongoose_1.Schema({
    uuid: { type: String },
    province_uuid: { type: String },
    name: { type: String },
    code: { type: String },
});
CitySchema.index('uuid');
CitySchema.index('province_uuid');
const CityModel = (0, mongoose_1.model)("cities", CitySchema);
exports.default = CityModel;
