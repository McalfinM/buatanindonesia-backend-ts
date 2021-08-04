import { Document } from "mongoose";

export interface ICity extends Document {
    uuid: string
    province_uuid: string
    name: string
    code: string
}