
import { ICity } from "../models/interfaces/city";
import { IDistrict } from "../models/interfaces/district";
import { IProvinces } from "../models/interfaces/province";
import BaseEntity from "./baseEntity";

class DistrictEntity extends BaseEntity {

    protected _uuid: string
    protected _city_uuid: string
    protected _name: string
    protected _code: string


    constructor(params: IDistrict) {
        super();
        this._uuid = params.uuid
        this._name = params.name
        this._city_uuid = params.city_uuid
        this._code = params.code
    }

    get uuid(): string {
        return this._uuid
    }

    set uuid(uuid: string) {
        this._uuid = uuid
    }

    get city_uuid(): string {
        return this._city_uuid
    }

    set city_uuid(city_uuid: string) {
        this._city_uuid = city_uuid
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
            city_uuid: this.city_uuid,
            name: this.name,
            code: this.code
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            city_uuid: this.city_uuid,
            name: this.name,
            code: this.code
        };
    }

}

export default DistrictEntity;
