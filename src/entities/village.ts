
import { IVillage } from "../models/interfaces/villages";
import BaseEntity from "./baseEntity";

class VillageEntity extends BaseEntity {

    protected _uuid: string
    protected _district_uuid: string
    protected _postal_code: string
    protected _name: string
    protected _code: string


    constructor(params: IVillage) {
        super();
        this._uuid = params.uuid
        this._name = params.name
        this._district_uuid = params.district_uuid
        this._postal_code = params.postal_code
        this._code = params.code
    }

    get uuid(): string {
        return this._uuid
    }

    set uuid(uuid: string) {
        this._uuid = uuid
    }

    get district_uuid(): string {
        return this._district_uuid
    }

    set district_uuid(district_uuid: string) {
        this._district_uuid = district_uuid
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

    get postal_code(): string {
        return this._postal_code
    }

    set postal_code(postal_code: string) {
        this._postal_code = postal_code
    }


    toJson(): object {
        return {
            uuid: this.uuid,
            district_uuid: this.district_uuid,
            name: this.name,
            code: this.code
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            district_uuid: this.district_uuid,
            name: this.name,
            code: this.code
        };
    }

}

export default VillageEntity;
