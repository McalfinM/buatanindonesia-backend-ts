
import { ICity } from "../models/interfaces/city";
import { IProvinces } from "../models/interfaces/province";
import BaseEntity from "./baseEntity";

class CityEntity extends BaseEntity {

    protected _uuid: string
    protected _province_uuid: string
    protected _name: string
    protected _code: string


    constructor(params: ICity) {
        super();
        this._uuid = params.uuid
        this._name = params.name
        this._province_uuid = params.province_uuid
        this._code = params.code
    }

    get uuid(): string {
        return this._uuid
    }

    set uuid(uuid: string) {
        this._uuid = uuid
    }

    get province_uuid(): string {
        return this._province_uuid
    }

    set province_uuid(province_uuid: string) {
        this._province_uuid = province_uuid
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get code(): string {
        return this._code
    }

    set code(code: string) {
        this._code = code
    }


    toJson(): object {
        return {
            uuid: this.uuid,
            province_uuid: this.province_uuid,
            name: this.name,
            code: this.code
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            province_uuid: this.province_uuid,
            name: this.name,
            code: this.code
        };
    }

}

export default CityEntity;
