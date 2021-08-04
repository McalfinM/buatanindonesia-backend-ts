import { Document } from "mongoose";

export interface IProvinces extends Document {
    uuid: string
    name: string
    code: string
}