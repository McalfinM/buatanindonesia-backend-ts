import { model, Schema, Model } from "mongoose";
import { IVillage } from "./interfaces/villages";

const VillageSchema: Schema = new Schema(
    {
        uuid: { type: String },
        district_uuid: { type: String },
        postal_code: { type: String },
        name: { type: String },
        code: { type: String },
    }
);

VillageSchema.index('uuid')

const VillageModel: Model<IVillage> = model(
    "villages",
    VillageSchema
);

export default VillageModel;
