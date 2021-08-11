export interface IEmbed {
    uuid?: string
    name?: string
    image?: string
    province_uuid?: string
    city_uuid?: string
    code?: string
}

export interface IProductEntity {
    uuid: string
    created_by: IEmbed
    name: string
    slug: string
    description: string
    price: number
    stock: number
    image: string
    cloudinary_id: string
    is_active: boolean
    category: IEmbed
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}