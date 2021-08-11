import { model, Schema, Model } from "mongoose";
import { ICartModel } from "./interfaces/cart";

const CartSchema: Schema = new Schema(
    {
        uuid: { type: String },
        created_by: { type: Object },
        order_id: { type: String },
        quantity: { type: Number },
        product: { type: Array },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

CartSchema.index('uuid')
CartSchema.index('order_id')
CartSchema.index('created_by')

const CartModel: Model<ICartModel> = model(
    "cart",
    CartSchema
);

export default CartModel;
