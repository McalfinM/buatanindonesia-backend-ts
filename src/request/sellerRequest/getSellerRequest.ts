
class GetSellerRequest {
    protected _name?: string;
    protected _email?: string;
    protected _status?: string;
    protected _card_holder_name?: string
    protected _sort_by?: any;
    protected _page?: number;
    protected _limit?: number;
    protected _search?: string;

    constructor(queryParams: {
        name?: string
        email?: string
        status?: string
        card_holder_name?: string
        sort_by?: any
        page?: number
        limit?: number
        search?: string
    }) {

        this._name = queryParams.name
        this._email = queryParams.email
        this._status = queryParams.status
        this._card_holder_name = queryParams.card_holder_name
        this._sort_by = queryParams.sort_by
        this._page = queryParams.page
        this._limit = queryParams.limit
        this._search = queryParams.search
    }

    get search(): string | undefined {
        return this._search
    }

    get name(): string | undefined {
        return this._name
    }

    get email(): string | undefined {
        return this._email
    }

    get status(): string | undefined {
        return this._status
    }

    get card_holder_name(): string | undefined {
        return this._card_holder_name
    }

    get sort_by(): string | undefined {
        return this._sort_by
    }

    get page(): number | undefined {
        return this._page
    }

    get limit(): number | undefined {
        return this._limit
    }
}

export default GetSellerRequest;
