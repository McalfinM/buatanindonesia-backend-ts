


class CreateUserRequest {
    protected _uuid: string
    protected _name: string
    protected _email: string
    protected _password: string
    protected _confirm_password: string
    protected _created_at: Date | null
    protected _updated_at: Date | null
    protected _deleted_at: Date | null


    constructor(body: {
        uuid: string
        name: string
        email: string
        password: string
        confirm_password: string
        created_at: Date | null
        updated_at: Date | null
        deleted_at: Date | null

    }) {
        this._uuid = body.uuid
        this._name = body.name
        this._email = body.email
        this._password = body.password
        this._confirm_password = body.confirm_password
        this._created_at = body.created_at
        this._updated_at = body.updated_at
        this._deleted_at = body.deleted_at
    }


    get name(): string {
        return this._name
    }
    get email(): string {
        return this._email
    }
    get password(): string {
        return this._password
    }
    get confirm_password(): string {
        return this._confirm_password
    }
    get created_at(): Date | null {
        return this._created_at
    }
    get updated_at(): Date | null {
        return this._updated_at
    }
    get deleted_at(): Date | null {
        return this._deleted_at
    }

}

export default CreateUserRequest