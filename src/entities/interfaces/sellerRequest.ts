import { IEmbed } from "./product";

export interface ISellerRequestEntity {
    uuid: string
    created_by: IEmbed
    email: string
    card_holder_name: string
    image: string
    status: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}