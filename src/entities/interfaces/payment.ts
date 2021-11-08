import { PaymentMethod, StatusOrder, StatusPayment } from "../enums/enum";
import { IProduct } from "./cart";
import { IEmbed } from "./product";


export interface IPaymentEntity {
    uuid: string
    no_invoice: string
    address: string
    delivery_date: Date
    phone: string
    email: string
    notes: string
    payment_method: PaymentMethod
    card_number: string
    idempotency: string
    created_by: IEmbed
    seller_by: IEmbed
    status_payment: StatusPayment
    status: StatusOrder
    card_name: string
    quantity: number
    product: IProduct
    total_price: number
    macaddress: string | null
    image: string
    cloudinary_id: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
}