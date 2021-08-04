import { model, Schema, Model } from "mongoose";
import { ILikes } from "./interfaces/likes";
import { IProvinces } from "./interfaces/province";

const ProvinceSchema: Schema = new Schema(
    {
        uuid: { type: String },
        name: { type: String },
        code: { type: String },
    }
);

ProvinceSchema.index('uuid')

const ProvinceModel: Model<IProvinces> = model(
    "provinces",
    ProvinceSchema
);

export default ProvinceModel;
