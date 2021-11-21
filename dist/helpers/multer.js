"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const errors_1 = require("./errors");
exports.default = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        console.log(file, 'ext');
        let ext = path_1.default.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new errors_1.ErrorUnprocessableEntity('File type not supported', '@Multer Helper'));
            return;
        }
        cb(null, true);
    }
});
