import { model, Schema, Model } from "mongoose";
import { ISellerRequest } from "./interfaces/sellerRequest";

const SellerRequest: Schema = new Schema(
    {
        uuid: { type: String },
        created_by: { type: Object },
        email: { type: String },
        bank: { type: Object },
        card_holder_name: { type: String },
        phone: { type: String },
        image: { type: String },
        ktp_image: { type: String },
        name: { type: String },
        status: { type: String },
        province: { type: Object },
        city: { type: Object },
        district: { type: Object },
        address: { Type: String },
        village: { type: Object },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

SellerRequest.index('uuid')

const SellerRequestModel: Model<ISellerRequest> = model(
    "Seller_Request",
    SellerRequest
);

export default SellerRequestModel;
