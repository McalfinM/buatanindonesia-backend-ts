class CreateSellerRequest {
    protected _name: string
    protected _ktp_image: string
    protected _card_holder_name: string
    protected _card_number: string
    protected _bank_uuid: string
    protected _image: string[]
    protected _phone: string


    constructor(body: {
        name: string
        ktp_image: string
        card_holder_name: string
        card_number: string
        image: string[]
        phone: string
        bank_uuid: string

    }) {
        this._name = body.name
        this._ktp_image = body.ktp_image
        this._card_holder_name = body.card_holder_name
        this._card_number = body.card_number
        this._image = body.image
        this._phone = body.phone
        this._bank_uuid = body.bank_uuid
    }

    get name(): string {
        return this._name
    }
    get ktp_image(): string {
        return this._ktp_image
    }
    get card_holder_name(): string {
        return this._card_holder_name
    }
    get card_number(): string {
        return this._card_number
    }
    get image(): string[] {
        return this._image
    }
    get phone(): string {
        return this._phone
    }
    get bank_uuid(): string {
        return this._bank_uuid
    }


}

export default CreateSellerRequest