import { Document } from "mongoose";

import { ISellerRequestEntity } from "../../entities/interfaces/sellerRequest";

export interface ISellerRequest extends ISellerRequestEntity, Document { }