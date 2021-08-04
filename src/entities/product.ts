
import BaseEntity from "./baseEntity";
import { IEmbed, IProductEntity } from "./interfaces/product";

class ProductEntity extends BaseEntity {
    protected _uuid: string
    protected _created_by: IEmbed
    protected _name: string
    protected _slug: string
    protected _description: string
    protected _price: number
    protected _stock: number
    protected _image: string
    protected _cloudinary_id: string
    protected _is_active: boolean
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null
    constructor(params: IProductEntity) {
        super();
        this._uuid = params.uuid
        this._created_by = params.created_by
        this._name = params.name
        this._slug = params.slug
        this._description = params.description
        this._price = params.price
        this._stock = params.stock
        this._image = params.image
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
    get name(): string {
        return this._name
    }
    set name(name: string) {
        this._name = name
    }
    get slug(): string {
        return this._slug
    }
    set slug(slug: string) {
        this._slug = slug
    }
    get description(): string {
        return this._description
    }
    set description(description: string) {
        this._description = description
    }
    get cloudinary_id(): string {
        return this._cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string) {
        this._cloudinary_id = cloudinary_id
    }
    get price(): number {
        return this._price
    }
    set price(price: number) {
        this._price = price
    }
    get stock(): number {
        return this._stock
    }
    set stock(stock: number) {
        this._stock = stock
    }
    get image(): string {
        return this._image
    }
    set image(image: string) {
        this._image = image
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
            name: this.name,
            slug: this.slug,
            description: this.description,
            price: this.price,
            stock: this.stock,
            image: this.image,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toListData(): {} {
        return {
            created_by: this.created_by,
            name: this.name,
            slug: this.slug,
            price: this.price,
            stock: this.stock,
            image: this.image,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            name: this.name,
            slug: this.slug,
            description: this.description,
            price: this.price,
            stock: this.stock,
            image: this.image,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}

export default ProductEntity;
