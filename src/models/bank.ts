import { model, Schema, Model } from "mongoose";
import { IBankModel } from "./interfaces/bank";

const BankSchema: Schema = new Schema(
    {
        uuid: { type: String },
        name: { type: String },
        code: { type: String },
    }
);

BankSchema.index('uuid')

const BankModel: Model<IBankModel> = model(
    "bank",
    BankSchema
);

export default BankModel;
