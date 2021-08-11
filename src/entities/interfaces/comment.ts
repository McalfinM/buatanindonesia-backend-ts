import { IEmbed } from "./profile";


export interface IComment {
    uuid: string
    created_by: IEmbed
    comment: string
    post_uuid?: string
    ip_address?: string
    key: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at?: Date | null
}