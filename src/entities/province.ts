
import { IProvinces } from "../models/interfaces/province";
import BaseEntity from "./baseEntity";

class ProvinceEntity extends BaseEntity {

    protected _uuid: string
    protected _name: string
    protected _code: string


    constructor(params: IProvinces) {
        super();
        this._uuid = params.uuid
        this._name = params.name,
            this._code = params.code
    }

    get uuid(): string {
        return this._uuid
    }

    set uuid(uuid: string) {
        this._uuid = uuid
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
            name: this.name,
            code: this.code
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            name: this.name,
            code: this.code
        };
    }

}

export default ProvinceEntity;
