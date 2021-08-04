import { model, Schema, Model } from "mongoose";
import { ICity } from "./interfaces/city";

const CitySchema: Schema = new Schema(
    {
        uuid: { type: String },
        province_uuid: { type: String },
        name: { type: String },
        code: { type: String },
    }
);

CitySchema.index('uuid')
CitySchema.index('province_uuid')

const CityModel: Model<ICity> = model(
    "cities",
    CitySchema
);

export default CityModel;
