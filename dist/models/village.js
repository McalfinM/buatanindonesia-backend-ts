"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VillageSchema = new mongoose_1.Schema({
    uuid: { type: String },
    district_uuid: { type: String },
    postal_code: { type: String },
    name: { type: String },
    code: { type: String },
});
VillageSchema.index('uuid');
const VillageModel = (0, mongoose_1.model)("villages", VillageSchema);
exports.default = VillageModel;
