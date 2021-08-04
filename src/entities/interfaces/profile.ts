import { UserRole } from "../enums/enum";

export interface IEmbed {
    uuid?: string
    name?: string
    image?: string
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
    phone: string
    email: string
    image: string
    roles: string[]
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}