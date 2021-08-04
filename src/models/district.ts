import { model, Schema, Model } from "mongoose";
import { IDistrict } from "./interfaces/district";

const DistrictSchema: Schema = new Schema(
    {
        uuid: { type: String },
        city_uuid: { type: String },
        name: { type: String },
        code: { type: String },
    }
);

DistrictSchema.index('uuid')

const DistrictModel: Model<IDistrict> = model(
    "district",
    DistrictSchema
);

export default DistrictModel;
