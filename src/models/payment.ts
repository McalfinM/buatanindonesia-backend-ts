import { model, Schema, Model } from "mongoose";
import { IPayment } from "./interfaces/payment";

const PaymentSchema: Schema = new Schema(
    {
        uuid: { type: String },
        no_invoice: { type: String },
        address: { type: String },
        delivery_date: { type: String },
        phone: { type: String },
        email: { type: String },
        notes: { type: String },
        payment_method: { type: String },
        card_number: { type: String },
        idempotency: { type: String },
        created_by: { type: Object },
        seller_by: { type: Object },
        status: { type: String },
        card_name: { type: String },
        quantity: { type: Number },
        product: { type: Object },
        total_price: { type: Number },
        image: { type: String },
        cloudinary_id: { type: String },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

PaymentSchema.index('uuid')
PaymentSchema.index('payment_method')

const PaymentModel: Model<IPayment> = model(
    "payments",
    PaymentSchema
);

export default PaymentModel;
