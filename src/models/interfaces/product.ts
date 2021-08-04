import { Document } from "mongoose";
import { IProductEntity } from "../../entities/interfaces/product";

export interface IProduct extends IProductEntity, Document { }