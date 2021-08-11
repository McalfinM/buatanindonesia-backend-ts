
class GetProductRequest {
    protected _name?: string;
    protected _price?: string;
    protected _stock?: string;
    protected _sort_by?: any;
    protected _page?: number;
    protected _limit?: number;
    protected _search?: string;

    constructor(queryParams: {
        name?: string
        price?: string
        stock?: string
        sort_by?: any
        page?: number
        limit?: number
        search?: string
    }) {

        this._name = queryParams.name
        this._price = queryParams.price
        this._stock = queryParams.stock
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

    get stock(): string | undefined {
        return this._stock
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
