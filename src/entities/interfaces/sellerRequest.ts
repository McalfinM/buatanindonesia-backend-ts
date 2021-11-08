import { IEmbed } from "./product";

export interface ISellerRequestEntity {
    uuid: string
    name: string
    created_by: IEmbed
    bank: IEmbed,
    email: string
    card_holder_name: string
    card_number: string
    phone: string
    image: string[]
    status: string
    ktp_image: string | null
    province: IEmbed
    city: IEmbed
    district: IEmbed
    village: IEmbed
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}