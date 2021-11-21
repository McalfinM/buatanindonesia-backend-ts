
import BaseEntity from "./baseEntity";
import { IEmbed } from "./interfaces/product";
import { ISellerRequestEntity } from './interfaces/sellerRequest'

class SellerRequestEntity extends BaseEntity {

    protected _uuid: string
    protected _name: string
    protected _created_by: IEmbed
    protected _bank: IEmbed
    protected _email: string
    protected _card_holder_name: string
    protected _card_number: string
    protected _image: string
    protected _status: string
    protected _phone: string
    protected _province: IEmbed
    protected _address: string
    protected _city: IEmbed
    protected _district: IEmbed
    protected _village: IEmbed
    protected _ktp_image: string | null
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null




    constructor(params: ISellerRequestEntity) {
        super();
        this._uuid = params.uuid
        this._created_by = params.created_by
        this._email = params.email
        this._card_holder_name = params.card_holder_name
        this._image = params.image
        this._card_number = params.card_number
        this._phone = params.phone
        this._status = params.status
        this._name = params.name
        this._ktp_image = params.ktp_image
        this._bank = params.bank
        this._province = params.province
        this._city = params.city
        this._district = params.district
        this._village = params.village
        this._address = params.address
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

    get email(): string {
        return this._email
    }

    set email(email: string) {
        this._email = email
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get ktp_image(): string | null {
        return this._ktp_image
    }

    set ktp_image(ktp_image: string | null) {
        this._ktp_image = ktp_image
    }

    get card_holder_name(): string {
        return this._card_holder_name
    }

    set card_holder_name(card_holder_name: string) {
        this._card_holder_name = card_holder_name
    }

    get card_number(): string {
        return this._card_number
    }

    set card_number(card_number: string) {
        this._card_number = card_number
    }

    get image(): string {
        return this._image
    }

    set image(image: string) {
        this._image = image
    }

    get address(): string {
        return this._address
    }

    set address(address: string) {
        this._address = address
    }

    get phone(): string {
        return this._phone
    }

    set phone(phone: string) {
        this._phone = phone
    }

    get status(): string {
        return this._status
    }

    set status(status: string) {
        this._status = status
    }

    get bank(): IEmbed {
        return this._bank
    }

    set bank(bank: IEmbed) {
        this._bank = bank
    }

    get province(): IEmbed {
        return this._province
    }
    set province(province: IEmbed) {
        this._province = province
    }
    get city(): IEmbed {
        return this._city
    }
    set city(city: IEmbed) {
        this._city = city
    }
    get district(): IEmbed {
        return this._district
    }
    set district(district: IEmbed) {
        this._district = district
    }
    get village(): IEmbed {
        return this._village
    }
    set village(village: IEmbed) {
        this._village = village
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
            name: this.name,
            created_by: this.created_by,
            bank: this.bank,
            email: this.email,
            card_holder_name: this.card_holder_name,
            card_number: this.card_number,
            image: this.image,
            status: this.status,
            phone: this.phone,
            ktp_image: this.ktp_image,
            address: this.address,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            image: this.image,
            status: this.status,
            created_at: this.created_at,
        };
    }

}

export default SellerRequestEntity;
