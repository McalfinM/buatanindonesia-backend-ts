"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudSellerRequest = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudSellerRequest = async (data) => {
    cloudinary_1.default.v2.config({
        cloud_name: 'dti2eqvdi',
        api_key: '933977989797497',
        api_secret: '5snrdrJd9Fd3A4HuH9IKQfF9FlM'
    });
    let payload = {
        secure_url: "",
        cloudinary_id: ""
    };
    const upload = await cloudinary_1.default.v2.uploader.upload(data, { folder: 'seller_request' })
        .then(result => {
        console.log('success upload seller request');
        payload.secure_url = result.secure_url;
        payload.cloudinary_id = result.public_id.replace('seller_request/', "");
    }).catch(err => {
        console.log(err);
    });
    return payload;
};
exports.cloudSellerRequest = cloudSellerRequest;
