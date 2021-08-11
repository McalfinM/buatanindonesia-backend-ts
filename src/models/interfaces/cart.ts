import { Document } from "mongoose";
import { ICartEntity } from "../../entities/interfaces/cart";


export interface ICartModel extends ICartEntity, Document { }