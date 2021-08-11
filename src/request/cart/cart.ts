
class CreateCartRequest {
    protected _product_uuid: string

    constructor(body: {
        product_uuid: string

    }) {
        this._product_uuid = body.product_uuid
    }

    get product_uuid(): string {
        return this._product_uuid
    }


}

export default CreateCartRequest