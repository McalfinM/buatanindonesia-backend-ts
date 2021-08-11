import { Document } from "mongoose";
import { IBanksEntity } from "../../entities/bank";

export interface IBankModel extends IBanksEntity, Document { }