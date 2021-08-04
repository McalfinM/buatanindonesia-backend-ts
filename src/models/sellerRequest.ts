import { model, Schema, Model } from "mongoose";
import { ISellerRequest } from "./interfaces/sellerRequest";

const SellerRequest: Schema = new Schema(
    {
        uuid: { type: String },
        created_by: { type: Object },
        email: { type: String },
        card_holder_name: { type: String },
        image: { type: String },
        status: { type: String },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

SellerRequest.index('uuid')

const SellerModel: Model<ISellerRequest> = model(
    "SellerRequest",
    SellerRequest
);

export default SellerModel;
