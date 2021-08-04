import { Document } from "mongoose";
import { IProfileEntity } from "../../entities/interfaces/profile";

export interface IProfile extends IProfileEntity, Document { }