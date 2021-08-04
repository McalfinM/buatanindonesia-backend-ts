import { Document } from "mongoose";

export interface IVillage extends Document {
    uuid: string
    district_uuid: string
    name: string
    code: string
    postal_code: string
}