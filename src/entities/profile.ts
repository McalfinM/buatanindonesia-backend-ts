
import BaseEntity from "./baseEntity";
import { UserRole } from "./enums/enum";
import { IComment } from "./interfaces/comment";
import { IEmbed } from "./interfaces/product";
import { IProfileEntity } from "./interfaces/profile";


class ProfileEntity extends BaseEntity {
    protected _uuid: string
    protected _created_by: IEmbed
    protected _slug: string
    protected _address: string
    protected _card_number: string
    protected _province: IEmbed
    protected _city: IEmbed
    protected _district: IEmbed
    protected _village: IEmbed
    protected _phone: string
    protected _email: string
    protected _image: string
    protected _cloudinary_id: string
    protected _roles: string[]
    protected _bank: IEmbed
    protected _is_active: boolean
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null

    constructor(params: IProfileEntity) {
        super();
        this._uuid = params.uuid
        this._created_by = params.created_by
        this._slug = params.slug
        this._address = params.address
        this._card_number = params.card_number
        this._province = params.province
        this._city = params.city
        this._district = params.district
        this._village = params.village
        this._cloudinary_id = params.cloudinary_id
        this._phone = params.phone
        this._email = params.email
        this._image = params.image
        this._roles = params.roles
        this._bank = params.bank
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
    get slug(): string {
        return this._slug
    }
    set slug(slug: string) {
        this._slug = slug
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
    get roles(): string[] {
        return this._roles
    }
    set roles(roles: string[]) {
        this._roles = roles
    }
    get bank(): IEmbed {
        return this._bank
    }
    set bank(bank: IEmbed) {
        this._bank = bank
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
            slug: this.slug,
            address: this.address,
            card_number: this.card_number,
            province: this.province,
            city: this.city,
            district: this.district,
            village: this.village,
            phone: this.phone,
            bank: this.bank,
            email: this.email,
            image: this.image,
            cloudinary_id: this.cloudinary_id,
            roles: this.roles,
            is_active: this.is_active,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            city: this.city,
            image: this.image,
            slug: this.slug
        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            created_by: this.created_by,
            slug: this.slug,
            address: this.address,
            card_number: this.card_number,
            province: this.province,
            city: this.city,
            district: this.district,
            phone: this.phone,
            email: this.email,
            image: this.image,
            roles: this.roles,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    toProfile(): {} {
        return {
            uuid: this.uuid,
            name: this.created_by.name,
            city: this.city,
            image: this.image,
            email: this.email,
            phone: this.phone,
            roles: this.roles,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }
}

export default ProfileEntity;
