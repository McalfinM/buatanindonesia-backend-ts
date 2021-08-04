
import { IProvinces } from "../models/interfaces/province";
import BaseEntity from "./baseEntity";
import { IEmbed } from "./interfaces/product";
import { ISellerRequestEntity } from './interfaces/sellerRequest'

class ProvinceEntity extends BaseEntity {

    protected _uuid: string
    protected _created_by: IEmbed
    protected _email: string
    protected _card_holder_name: string
    protected _image: string
    protected _status: string
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
        this._status = params.status
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

    get card_holder_name(): string {
        return this._card_holder_name
    }

    set card_holder_name(card_holder_name: string) {
        this._card_holder_name = card_holder_name
    }

    get image(): string {
        return this._image
    }

    set image(image: string) {
        this._image = image
    }

    get status(): string {
        return this._status
    }

    set status(status: string) {
        this._status = status
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
            email: this.email,
            card_holder_name: this.card_holder_name,
            image: this.image,
            status: this.status,
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
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

}

export default ProvinceEntity;
