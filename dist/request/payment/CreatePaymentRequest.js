"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreatePaymentRequest {
    _address;
    _delivery_date;
    _phone;
    _email;
    _notes;
    _product_uuid;
    _seller_uuid;
    _payment_method;
    _card_number;
    _idempotency;
    _status;
    _card_name;
    _quantity;
    _total_price;
    _image;
    _cloudinary_id;
    constructor(body) {
        this._address = body.address;
        this._delivery_date = body.delivery_date;
        this._phone = body.phone;
        this._email = body.email;
        this._notes = body.notes;
        this._payment_method = body.payment_method;
        this._card_number = body.card_number;
        this._idempotency = body.idempotency;
        this._status = body.status;
        this._card_name = body.card_name;
        this._quantity = body.quantity;
        this._total_price = body.total_price;
        this._image = body.image;
        this._cloudinary_id = body.cloudinary_id;
        this._product_uuid = body.product_uuid;
        this._seller_uuid = body.seller_uuid;
    }
    get address() {
        return this.address;
    }
    set address(address) {
        this._address = address;
    }
    get delivery_date() {
        return this.delivery_date;
    }
    set delivery_date(delivery_date) {
        this._delivery_date = delivery_date;
    }
    get phone() {
        return this.phone;
    }
    set phone(phone) {
        this._phone = phone;
    }
    get email() {
        return this.email;
    }
    set email(email) {
        this._email = email;
    }
    get notes() {
        return this.notes;
    }
    set notes(notes) {
        this.notes = notes;
    }
    get payment_method() {
        return this.payment_method;
    }
    set payment_method(payment_method) {
        this.payment_method = payment_method;
    }
    get card_number() {
        return this.card_number;
    }
    set card_number(card_number) {
        this.card_number = card_number;
    }
    get idempotency() {
        return this.idempotency;
    }
    set idempotency(idempotency) {
        this.idempotency = idempotency;
    }
    get status() {
        return this.status;
    }
    set status(status) {
        this.status = status;
    }
    get card_name() {
        return this.card_name;
    }
    set card_name(card_name) {
        this.card_name = card_name;
    }
    get quantity() {
        return this.quantity;
    }
    set quantity(quantity) {
        this.quantity = quantity;
    }
    get total_price() {
        return this.total_price;
    }
    set total_price(total_price) {
        this.total_price = total_price;
    }
    get image() {
        return this.image;
    }
    set image(image) {
        this.image = image;
    }
    get cloudinary_id() {
        return this.cloudinary_id;
    }
    set cloudinary_id(cloudinary_id) {
        this.cloudinary_id = cloudinary_id;
    }
    get product_uuid() {
        return this._product_uuid;
    }
    set product_uuid(product_uuid) {
        this._product_uuid = product_uuid;
    }
    get seller_uuid() {
        return this._seller_uuid;
    }
    set seller_uuid(seller_uuid) {
        this._seller_uuid = seller_uuid;
    }
}
exports.default = CreatePaymentRequest;
