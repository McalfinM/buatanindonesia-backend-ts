import { model, Schema, Model } from "mongoose";
import { IDistrict } from "./interfaces/district";
import { IProduct } from "./interfaces/product";

const ProductSchema: Schema = new Schema(
    {
        uuid: { type: String },
        created_by: { type: Object },
        name: { type: String },
        slug: { type: String },
        description: { type: String },
        price: { type: Number },
        stock: { type: Number },
        image: { type: String },
        cloudinary_id: { type: String },
        is_active: { type: Boolean },
        created_at: { type: Date },
        updated_at: { type: Date },
        deleted_at: { type: Date },
    }
);

ProductSchema.index('uuid')
ProductSchema.index('slug')
ProductSchema.index('name')

const ProductModel: Model<IProduct> = model(
    "products",
    ProductSchema
);

export default ProductModel;
