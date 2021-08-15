
import BaseEntity from "./baseEntity";
import { PaymentMethod, StatusPayment } from "./enums/enum";
import { IProduct } from "./interfaces/cart";
import { IPaymentEntity } from "./interfaces/payment";
import { IEmbed } from "./interfaces/product";

class PaymentEntity extends BaseEntity {
    protected _uuid: string
    protected _no_invoice: string
    protected _address: string
    protected _delivery_date: Date
    protected _phone: string
    protected _email: string
    protected _notes: string
    protected _payment_method: PaymentMethod
    protected _card_number: string
    protected _idempotency: string
    protected _created_by: IEmbed
    protected _seller_by: IEmbed
    protected _status: StatusPayment
    protected _card_name: string
    protected _quantity: number
    protected _product: IProduct
    protected _total_price: number
    protected _image: string
    protected _cloudinary_id: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null

    constructor(params: IPaymentEntity) {
        super();
        this._uuid = params.uuid
        this._no_invoice = params.no_invoice
        this._address = params.address
        this._delivery_date = params.delivery_date
        this._phone = params.phone
        this._email = params.email
        this._notes = params.notes
        this._payment_method = params.payment_method
        this._card_number = params.card_number
        this._idempotency = params.idempotency
        this._created_by = params.created_by
        this._seller_by = params.seller_by
        this._status = params.status
        this._card_name = params.card_name
        this._quantity = params.quantity
        this._product = params.product
        this._total_price = params.total_price
        this._image = params.image
        this._cloudinary_id = params.cloudinary_id
        this._created_at = params.created_at
        this._updated_at = params.updated_at
        this._deleted_at = params.deleted_at
    }

    get uuid(): string {
        return this._uuid
    }
    set uuid(uuid: string) {
        this._uuid = uuid
    }
    get no_invoice(): string {
        return this._no_invoice
    }
    set no_invoice(no_invoice: string) {
        this._no_invoice = no_invoice
    }
    get address(): string {
        return this._address
    }
    set address(address: string) {
        this._address = address
    }
    get delivery_date(): Date {
        return this._delivery_date
    }
    set delivery_date(delivery_date: Date) {
        this._delivery_date = delivery_date
    }
    get phone(): string {
        return this._phone
    }
    set phone(phone: string) {
        this._phone = phone
    }
    get email(): string {
        return this._email
    }
    set email(email: string) {
        this._email = email
    }
    get notes(): string {
        return this._notes
    }
    set notes(notes: string) {
        this._notes = notes
    }
    get payment_method(): PaymentMethod {
        return this._payment_method
    }
    set payment_method(payment_method: PaymentMethod) {
        this._payment_method = payment_method
    }
    get card_number(): string {
        return this._card_number
    }
    set card_number(card_number: string) {
        this._card_number = card_number
    }
    get idempotency(): string {
        return this._idempotency
    }
    set idempotency(idempotency: string) {
        this._idempotency = idempotency
    }
    get created_by(): IEmbed {
        return this._created_by
    }
    set created_by(created_by: IEmbed) {
        this._created_by = created_by
    }
    get seller_by(): IEmbed {
        return this._seller_by
    }
    set seller_by(seller_by: IEmbed) {
        this._seller_by = seller_by
    }
    get status(): StatusPayment {
        return this._status
    }
    set status(status: StatusPayment) {
        this._status = status
    }
    get card_name(): string {
        return this._card_name
    }
    set card_name(card_name: string) {
        this._card_name = card_name
    }
    get quantity(): number {
        return this._quantity
    }
    set quantity(quantity: number) {
        this._quantity = quantity
    }
    get product(): IProduct {
        return this._product
    }
    set product(product: IProduct) {
        this._product = product
    }
    get total_price(): number {
        return this._total_price
    }
    set total_price(total_price: number) {
        this._total_price = total_price
    }
    get image(): string {
        return this._image
    }
    set image(image: string) {
        this._image = image
    }
    get cloudinary_id(): string {
        return this._cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string) {
        this._cloudinary_id = cloudinary_id
    }
    get created_at(): Date | null {
        return this._created_at
    }
    set created_at(created_at: Date | null) {
        this._created_at = created_at
    }
    get updated_at(): Date | null {
        return this._updated_at
    }
    set updated_at(updated_at: Date | null) {
        this._updated_at = updated_at
    }
    get deleted_at(): Date | null {
        return this._deleted_at
    }
    set deleted_at(deleted_at: Date | null) {
        this._deleted_at = deleted_at
    }

    toJson(): object {
        return {
            uuid: this.uuid,
            no_invoice: this.no_invoice,
            address: this.address,
            delivery_date: this.delivery_date,
            phone: this.phone,
            email: this.email,
            notes: this.notes,
            payment_method: this.payment_method,
            card_number: this.card_number,
            idempotency: this.idempotency,
            created_by: this.created_by,
            seller_by: this.seller_by,
            status: this.status,
            card_name: this.card_name,
            quantity: this.quantity,
            product: this.product,
            total_price: this.total_price,
            image: this.image,
            cloudinary_id: this.cloudinary_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            no_invoice: this.no_invoice,
            address: this.address,
            delivery_date: this.delivery_date,
            created_by: this.created_by,
            seller_by: this.seller_by,
            status: this.status,
            quantity: this.quantity,
            product: this.product,
            total_price: this.total_price,
            image: this.image,
            cloudinary_id: this.cloudinary_id,
            created_at: this.created_at,

        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            no_invoice: this.no_invoice,
            address: this.address,
            delivery_date: this.delivery_date,
            phone: this.phone,
            email: this.email,
            notes: this.notes,
            payment_method: this.payment_method,
            card_number: this.card_number,
            idempotency: this.idempotency,
            created_by: this.created_by,
            seller_by: this.seller_by,
            status: this.status,
            card_name: this.card_name,
            quantity: this.quantity,
            product: this.product,
            total_price: this.total_price,
            image: this.image,
            cloudinary_id: this.cloudinary_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}

export default PaymentEntity;
