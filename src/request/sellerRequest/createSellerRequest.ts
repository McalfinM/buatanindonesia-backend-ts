class CreateSellerRequest {
    protected _name: string
    protected _ktp_image: string
    protected _card_holder_name: string
    protected _card_number: string
    protected _bank_uuid: string
    protected _image: string[]
    protected _phone: string
    protected _province_uuid: string
    protected _city_uuid: string
    protected _district_uuid: string
    protected _village_uuid: string


    constructor(body: {
        name: string
        ktp_image: string
        card_holder_name: string
        card_number: string
        image: string[]
        phone: string
        bank_uuid: string
        province_uuid: string
        city_uuid: string
        district_uuid: string
        village_uuid: string

    }) {
        this._name = body.name
        this._ktp_image = body.ktp_image
        this._card_holder_name = body.card_holder_name
        this._card_number = body.card_number
        this._image = body.image
        this._phone = body.phone
        this._bank_uuid = body.bank_uuid
        this._province_uuid = body.province_uuid
        this._city_uuid = body.city_uuid
        this._district_uuid = body.district_uuid
        this._village_uuid = body.village_uuid
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
    get province_uuid(): string {
        return this._province_uuid
    }
    set province_uuid(province_uuid: string) {
        this._province_uuid = province_uuid
    }
    get city_uuid(): string {
        return this._city_uuid
    }
    set city_uuid(city_uuid: string) {
        this._city_uuid = city_uuid
    }
    get district_uuid(): string {
        return this._district_uuid
    }
    set district_uuid(district_uuid: string) {
        this._district_uuid = district_uuid
    }
    get village_uuid(): string {
        return this._village_uuid
    }
    set village_uuid(village_uuid: string) {
        this._village_uuid = village_uuid
    }


}

export default CreateSellerRequest