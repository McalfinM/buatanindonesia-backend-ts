import { Document } from 'mongoose'

export interface IUser extends Document {
    uuid: string
    name: string
    email: string
    password: string
    roles: string[]
    is_active: boolean
    phone_number: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}
