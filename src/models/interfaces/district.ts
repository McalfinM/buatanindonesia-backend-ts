import { Document } from "mongoose";

export interface IDistrict extends Document {
    uuid: string
    city_uuid: string
    name: string
    code: string
}