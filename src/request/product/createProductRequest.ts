class CreateProductRequest {
    protected _name: string
    protected _description: string
    protected _category_uuid: string
    protected _price: number
    protected _stock: number
    protected _image: string
    protected _cloudinary_id: string

    constructor(body: {
        name: string
        description: string
        price: number
        stock: number
        category_uuid: string
        cloudinary_id: string
        image: string

    }) {
        this._name = body.name
        this._description = body.description
        this._price = body.price
        this._stock = body.stock
        this._image = body.image
        this._category_uuid = body.category_uuid
        this._cloudinary_id = body.cloudinary_id
    }

    get name(): string {
        return this._name
    }
    get description(): string {
        return this._description
    }
    get price(): number {
        return this._price
    }
    get stock(): number {
        return this._stock
    }
    get image(): string {
        return this._image
    }
    get cloudinary_id(): string {
        return this._cloudinary_id
    }
    get category_uuid(): string {
        return this._category_uuid
    }


}

export default CreateProductRequest