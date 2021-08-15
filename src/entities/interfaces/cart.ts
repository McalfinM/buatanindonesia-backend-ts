import { IEmbed } from "./profile";


export interface IProduct {
    uuid?: string
    product_uuid?: string
    price?: number
    name?: string
    image?: string
    stock?: number
    slug?: string
    quantity: number
    seller_by?: IEmbed
}

export interface ICartEntity {
    uuid: string
    created_by: IEmbed
    quantity: number
    product: IProduct[]
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}