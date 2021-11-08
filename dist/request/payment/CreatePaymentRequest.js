"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreatePaymentRequest {
    _address;
    _delivery_date;
    _phone;
    _email;
    _notes;
    _id;
    _payment_method;
    _card_number;
    _idempotency;
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
        this._card_name = body.card_name;
        this._quantity = body.quantity;
        this._total_price = body.total_price;
        this._image = body.image;
        this._cloudinary_id = body.cloudinary_id;
        this._id = body.id;
    }
    get address() {
        return this._address;
    }
    set address(address) {
        this._address = address;
    }
    get delivery_date() {
        return this._delivery_date;
    }
    set delivery_date(delivery_date) {
        this._delivery_date = delivery_date;
    }
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        this._phone = phone;
    }
    get email() {
        return this._email;
    }
    set email(email) {
        this._email = email;
    }
    get notes() {
        return this._notes;
    }
    set notes(notes) {
        this._notes = notes;
    }
    get payment_method() {
        return this._payment_method;
    }
    set payment_method(payment_method) {
        this.payment_method = payment_method;
    }
    get card_number() {
        return this._card_number;
    }
    set card_number(card_number) {
        this._card_number = card_number;
    }
    get idempotency() {
        return this._idempotency;
    }
    set idempotency(idempotency) {
        this._idempotency = idempotency;
    }
    get card_name() {
        return this._card_name;
    }
    set card_name(card_name) {
        this._card_name = card_name;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(quantity) {
        this._quantity = quantity;
    }
    get total_price() {
        return this._total_price;
    }
    set total_price(total_price) {
        this._total_price = total_price;
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    get cloudinary_id() {
        return this._cloudinary_id;
    }
    set cloudinary_id(cloudinary_id) {
        this._cloudinary_id = cloudinary_id;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
}
exports.default = CreatePaymentRequest;
