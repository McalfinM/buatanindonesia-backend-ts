import { IEmbed } from "./product";

export interface IProduct {
    uuid: string
    product_uuid: string
    price: number
    name: string
    image: string
    stock: number
}

export interface ICartEntity {
    uuid: string
    created_by: IEmbed
    seller_by: IEmbed
    order_id: string
    quantity: number
    product: IProduct
    price: number
    image: string
    cloudinary_id: string
    is_active: boolean
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}