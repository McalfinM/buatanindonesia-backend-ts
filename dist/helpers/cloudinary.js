"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudFunc = exports.cloud = exports.cloudinaryConfig = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloud = cloudinary_1.default.v2;
exports.cloud = cloud;
const cloudinaryConfig = cloud.config({
    cloud_name: 'dcyohew0h',
    api_key: '161487929687464',
    api_secret: 'Qlx_eILvPrRABcC6AywbhsSuNe0'
});
exports.cloudinaryConfig = cloudinaryConfig;
const cloudFunc = async (data) => {
    cloudinary_1.default.v2.config({
        cloud_name: 'dcyohew0h',
        api_key: '161487929687464',
        api_secret: 'Qlx_eILvPrRABcC6AywbhsSuNe0'
    });
    let payload = {
        secure_url: "",
        cloudinary_id: ""
    };
    const upload = await cloudinary_1.default.v2.uploader.upload(data, { folder: 'mangomase' })
        .then(result => {
        console.log('success upload');
        payload.secure_url = result.secure_url;
        payload.cloudinary_id = result.public_id.replace('mangomase/', "");
    }).catch(err => {
        console.log(err);
    });
    return payload;
};
exports.cloudFunc = cloudFunc;
