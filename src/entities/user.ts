
import BaseEntity from "./baseEntity";

export interface IUserEntitiy {
    uuid: string
    name: string
    email: string
    password: string
    roles: string[]
    is_active: boolean
    phone_number: string
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null

}

class UserEntity extends BaseEntity {
    protected _uuid: string
    protected _name: string
    protected _email: string
    protected _password: string
    protected _roles: string[]
    protected _is_active: boolean
    protected _phone_number: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(params: IUserEntitiy) {
        super();
        this._uuid = params.uuid
        this._name = params.name
        this._email = params.email
        this._password = params.password
        this._roles = params.roles
        this._is_active = params.is_active
        this._phone_number = params.phone_number
        this._created_at = params.created_at
        this._updated_at = params.updated_at
        this._deleted_at = params.deleted_at
    }

    get uuid(): string {
        return this._uuid;
    }

    set uuid(uuid: string) {
        this._uuid = uuid;
    }

    get name(): string {
        return this._name
    }
    get roles(): string[] {
        return this._roles
    }
    set roles(roles: string[]) {
        this._roles = roles
    }

    set name(name: string) {
        this._name = name
    }

    get email(): string {
        return this._email
    }

    set email(email: string) {
        this._email = email
    }


    get password(): string {
        return this._password
    }

    set password(password: string) {
        this._password = password
    }

    get is_active(): boolean {
        return this._is_active
    }

    set is_active(is_active: boolean) {
        this._is_active = is_active
    }


    get phone_number(): string {
        return this._phone_number
    }

    set phone_number(phone_number: string) {
        this._phone_number = phone_number
    }

    get created_at(): Date | null {
        return this._created_at;
    }

    set created_at(created_at: Date | null) {
        this._created_at = created_at;
    }

    get updated_at(): Date | null {
        return this._updated_at;
    }

    set updated_at(updated_at: Date | null) {
        this._updated_at = updated_at;
    }

    get deleted_at(): Date | null {
        return this._deleted_at;
    }

    set deleted_at(deleted_at: Date | null) {
        this._deleted_at = deleted_at;
    }

    toJson(): object {
        return {
            uuid: this.uuid,
            name: this.name,
            email: this.email,
            password: this.password,
            roles: this.roles,
            is_active: this.is_active,
            phone_number: this.phone_number,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toListData(): {} {
        return {
            uuid: this.uuid,
            name: this.name,
            password: this.password,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }

    toDetailData(): {} {
        return {
            uuid: this.uuid,
            name: this.name,
            password: this.password,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at,
        };
    }
}

export default UserEntity;
