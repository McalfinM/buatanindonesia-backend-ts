"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseEntity_1 = __importDefault(require("./baseEntity"));
class PaymentEntity extends baseEntity_1.default {
    _uuid;
    _no_invoice;
    _address;
    _delivery_date;
    _phone;
    _email;
    _notes;
    _payment_method;
    _card_number;
    _idempotency;
    _created_by;
    _seller_by;
    _status;
    _card_name;
    _quantity;
    _product;
    _total_price;
    _image;
    _cloudinary_id;
    _created_at;
    _updated_at;
    _deleted_at;
    constructor(params) {
        super();
        this._uuid = params.uuid;
        this._no_invoice = params.no_invoice;
        this._address = params.address;
        this._delivery_date = params.delivery_date;
        this._phone = params.phone;
        this._email = params.email;
        this._notes = params.notes;
        this._payment_method = params.payment_method;
        this._card_number = params.card_number;
        this._idempotency = params.idempotency;
        this._created_by = params.created_by;
        this._seller_by = params.seller_by;
        this._status = params.status;
        this._card_name = params.card_name;
        this._quantity = params.quantity;
        this._product = params.product;
        this._total_price = params.total_price;
        this._image = params.image;
        this._cloudinary_id = params.cloudinary_id;
        this._created_at = params.created_at;
        this._updated_at = params.updated_at;
        this._deleted_at = params.deleted_at;
    }
    get uuid() {
        return this._uuid;
    }
    set uuid(uuid) {
        this._uuid = uuid;
    }
    get no_invoice() {
        return this._no_invoice;
    }
    set no_invoice(no_invoice) {
        this._no_invoice = no_invoice;
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
        this._payment_method = payment_method;
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
    get created_by() {
        return this._created_by;
    }
    set created_by(created_by) {
        this._created_by = created_by;
    }
    get seller_by() {
        return this._seller_by;
    }
    set seller_by(seller_by) {
        this._seller_by = seller_by;
    }
    get status() {
        return this._status;
    }
    set status(status) {
        this._status = status;
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
    get product() {
        return this._product;
    }
    set product(product) {
        this._product = product;
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
    get created_at() {
        return this._created_at;
    }
    set created_at(created_at) {
        this._created_at = created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
    set updated_at(updated_at) {
        this._updated_at = updated_at;
    }
    get deleted_at() {
        return this._deleted_at;
    }
    set deleted_at(deleted_at) {
        this._deleted_at = deleted_at;
    }
    toJson() {
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
    toListData() {
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
    toDetailData() {
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
exports.default = PaymentEntity;
