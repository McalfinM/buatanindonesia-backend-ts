
import { ICity } from "../models/interfaces/city";
import { IDistrict } from "../models/interfaces/district";
import { IProvinces } from "../models/interfaces/province";
import BaseEntity from "./baseEntity";
import { ICartEntity, IProduct } from "./interfaces/cart";
import { IEmbed } from "./interfaces/product";

class CartEntity extends BaseEntity {

    protected _uuid: string
    protected _created_by: IEmbed
    protected _seller_by: IEmbed
    protected _order_id: string
    protected _quantity: number
    protected _product: IProduct
    protected _price: number
    protected _cloudinary_id: string
    protected _is_active: boolean
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(params: ICartEntity) {
        super();
        this._uuid = params.uuid
        this._created_by = params.created_by
        this._seller_by = params.seller_by
        this._order_id = params.order_id
        this._quantity = params.quantity
        this._product = params.product
        this._price = params.price
        this._cloudinary_id = params.cloudinary_id
        this._is_active = params.is_active
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
    get order_id(): string {
        return this._order_id
    }
    set order_id(order_id: string) {
        this._order_id = order_id
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
    get price(): number {
        return this._price
    }
    set price(price: number) {
        this._price = price
    }
    get cloudinary_id(): string {
        return this._cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string) {
        this._cloudinary_id = cloudinary_id
    }
    get is_active(): boolean {
        return this._is_active
    }
    set is_active(is_active: boolean) {
        this._is_active = is_active
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
            created_by: this.created_by,
            seller_by: this.seller_by,
            order_id: this.order_id,
            quantity: this.quantity,
            product: this.product,
            price: this.price,
            cloudinary_id: this.cloudinary_id,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            seller_by: this.seller_by,
            order_id: this.order_id,
            quantity: this.quantity,
            product: this.product,
            price: this.price,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

}

export default CartEntity;
