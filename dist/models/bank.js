"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BankSchema = new mongoose_1.Schema({
    uuid: { type: String },
    name: { type: String },
    code: { type: String },
});
BankSchema.index('uuid');
const BankModel = (0, mongoose_1.model)("bank", BankSchema);
exports.default = BankModel;
