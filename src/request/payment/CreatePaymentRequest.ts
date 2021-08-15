import { PaymentMethod, StatusPayment } from "../../entities/enums/enum"


class CreatePaymentRequest {
    protected _address: string
    protected _delivery_date: Date
    protected _phone: string
    protected _email: string
    protected _notes: string
    protected _product_uuid: string
    protected _seller_uuid: string
    protected _payment_method: PaymentMethod
    protected _card_number: string
    protected _idempotency: string
    protected _status: StatusPayment
    protected _card_name: string
    protected _quantity: number
    protected _total_price: number
    protected _image: string
    protected _cloudinary_id: string


    constructor(body: {
        address: string
        delivery_date: Date
        phone: string
        email: string
        notes: string
        payment_method: PaymentMethod
        card_number: string
        idempotency: string
        status: StatusPayment
        card_name: string
        quantity: number
        total_price: number
        image: string
        cloudinary_id: string
        product_uuid: string
        seller_uuid: string

    }) {
        this._address = body.address
        this._delivery_date = body.delivery_date
        this._phone = body.phone
        this._email = body.email
        this._notes = body.notes
        this._payment_method = body.payment_method
        this._card_number = body.card_number
        this._idempotency = body.idempotency
        this._status = body.status
        this._card_name = body.card_name
        this._quantity = body.quantity
        this._total_price = body.total_price
        this._image = body.image
        this._cloudinary_id = body.cloudinary_id
        this._product_uuid = body.product_uuid
        this._seller_uuid = body.seller_uuid
    }

    get address(): string {
        return this.address
    }
    set address(address: string) {
        this._address = address
    }
    get delivery_date(): Date {
        return this.delivery_date
    }
    set delivery_date(delivery_date: Date) {
        this._delivery_date = delivery_date
    }
    get phone(): string {
        return this.phone
    }
    set phone(phone: string) {
        this._phone = phone
    }
    get email(): string {
        return this.email
    }
    set email(email: string) {
        this._email = email
    }
    get notes(): string {
        return this.notes
    }
    set notes(notes: string) {
        this.notes = notes
    }
    get payment_method(): PaymentMethod {
        return this.payment_method
    }
    set payment_method(payment_method: PaymentMethod) {
        this.payment_method = payment_method
    }
    get card_number(): string {
        return this.card_number
    }
    set card_number(card_number: string) {
        this.card_number = card_number
    }
    get idempotency(): string {
        return this.idempotency
    }
    set idempotency(idempotency: string) {
        this.idempotency = idempotency
    }
    get status(): StatusPayment {
        return this.status
    }
    set status(status: StatusPayment) {
        this.status = status
    }
    get card_name(): string {
        return this.card_name
    }
    set card_name(card_name: string) {
        this.card_name = card_name
    }
    get quantity(): number {
        return this.quantity
    }
    set quantity(quantity: number) {
        this.quantity = quantity
    }
    get total_price(): number {
        return this.total_price
    }
    set total_price(total_price: number) {
        this.total_price = total_price
    }
    get image(): string {
        return this.image
    }
    set image(image: string) {
        this.image = image
    }
    get cloudinary_id(): string {
        return this.cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string) {
        this.cloudinary_id = cloudinary_id
    }
    get product_uuid(): string {
        return this._product_uuid
    }
    set product_uuid(product_uuid: string) {
        this._product_uuid = product_uuid
    }
    get seller_uuid(): string {
        return this._seller_uuid
    }
    set seller_uuid(seller_uuid: string) {
        this._seller_uuid = seller_uuid
    }

}

export default CreatePaymentRequest