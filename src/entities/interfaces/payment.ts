import { PaymentMethod, StatusPayment } from "../enums/enum";
import { IProduct } from "./cart";
import { IEmbed } from "./product";

export interface IPaymentEntity {
    uuid: string
    order_id: string
    address: string
    delivery_date: string
    phone: string
    email: string
    notes: string
    payment_method: PaymentMethod
    card_number: string
    idempotency: string
    created_by: IEmbed
    seller_by: IEmbed
    status: StatusPayment
    card_name: string
    quantity: number
    product: IProduct
    total_price: number
    image: string
    cloudinary_id: string
    is_active: boolean
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}