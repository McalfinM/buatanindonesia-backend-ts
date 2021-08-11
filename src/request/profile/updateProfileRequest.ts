class UpdateProfileRequest {
    protected _name: string
    protected _address: string
    protected _card_number: string
    protected _province_uuid: string
    protected _city_uuid: string
    protected _district_uuid: string
    protected _village_uuid: string
    protected _bank_uuid: string
    protected _phone: string
    protected _email: string
    protected _image: string
    protected _cloudinary_id: string

    constructor(body: {
        name: string
        address: string
        card_number: string
        province_uuid: string
        city_uuid: string
        district_uuid: string
        village_uuid: string
        bank_uuid: string
        phone: string
        email: string
        image: string
        cloudinary_id: string

    }) {
        this._name = body.name
        this._address = body.address
        this._card_number = body.card_number
        this._province_uuid = body.province_uuid
        this._city_uuid = body.city_uuid
        this._district_uuid = body.district_uuid
        this._village_uuid = body.village_uuid
        this._phone = body.phone
        this._email = body.email
        this._image = body.image
        this._cloudinary_id = body.cloudinary_id
        this._bank_uuid = body.bank_uuid
    }


    get name(): string {
        return this._name
    }
    set name(name: string) {
        this._name = name
    }
    get address(): string {
        return this._address
    }
    set address(address: string) {
        this._address = address
    }
    get card_number(): string {
        return this._card_number
    }
    set card_number(card_number: string) {
        this._card_number = card_number
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
    get phone(): string {
        return this._phone
    }
    set phone(phone: string) {
        this._phone = phone
    }
    get email(): string {
        return this._email
    }
    set email(email: string) {
        this._email = email
    }
    get image(): string {
        return this._image
    }
    set image(image: string) {
        this._image = image
    }
    get cloudinary_id(): string {
        return this._cloudinary_id
    }
    set cloudinary_id(cloudinary_id: string) {
        this._cloudinary_id = cloudinary_id
    }
    get bank_uuid(): string {
        return this._bank_uuid
    }
    set bank_uuid(bank_uuid: string) {
        this._bank_uuid = bank_uuid
    }
}

export default UpdateProfileRequest;