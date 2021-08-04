import { Document } from "mongoose";
import { IPaymentEntity } from "../../entities/interfaces/payment";

export interface IPayment extends IPaymentEntity, Document { }