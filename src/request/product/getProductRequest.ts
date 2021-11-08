
class GetProductRequest {
    protected _name?: string;
    protected _price?: string;
    protected _city?: string;
    protected _user_uuid?: string;
    protected _sort_by?: any;
    protected _page?: number;
    protected _limit?: number;
    protected _search?: string;

    constructor(queryParams: {
        name?: string
        price?: string
        city?: string
        user_uuid?: string
        sort_by?: any
        page?: number
        limit?: number
        search?: string
    }) {

        this._name = queryParams.name
        this._price = queryParams.price
        this._city = queryParams.city
        this._user_uuid = queryParams.user_uuid
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

    get price(): string | undefined {
        return this._price
    }

    get city(): string | undefined {
        return this._city
    }

    get user_uuid(): string | undefined {
        return this._user_uuid
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

export default GetProductRequest;
