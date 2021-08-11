import { UserRole } from "../enums/enum";

export interface IEmbed {
    uuid?: string
    name?: string
    image?: string
    slug?: string
}
export interface IProfileEntity {
    uuid: string
    created_by: IEmbed
    slug: string
    address: string
    card_number: string
    province: IEmbed
    city: IEmbed
    district: IEmbed
    village: IEmbed
    phone: string
    email: string
    cloudinary_id: string
    image: string
    roles: string[]
    bank: IEmbed
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}