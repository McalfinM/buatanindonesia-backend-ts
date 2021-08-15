
class GetPaymentRequest {
    protected _no_invoice?: string;
    protected _buyers?: string;
    protected _delivery_date?: Date
    protected _product_uuid?: string
    protected _status?: string
    protected _sort_by?: any;
    protected _user_uuid?: string
    protected _page?: number;
    protected _limit?: number;
    protected _search?: string;

    constructor(queryParams: {
        uuid?: string
        no_invoice?: string
        buyers?: string
        delivery_date?: Date
        product_uuid?: string
        status?: string
        sort_by?: any
        user_uuid?: string
        page?: number
        limit?: number
        search?: string
    }) {
        this._no_invoice = queryParams.no_invoice
        this._buyers = queryParams.buyers
        this._delivery_date = queryParams.delivery_date
        this._product_uuid = queryParams.product_uuid
        this._status = queryParams.status
        this._sort_by = queryParams.sort_by
        this._user_uuid = queryParams.user_uuid
        this._page = queryParams.page
        this._limit = queryParams.limit
        this._search = queryParams.search
    }

    get search(): string | undefined {
        return this._search
    }

    get delivery_date(): Date | undefined {
        return this._delivery_date
    }

    get no_invoice(): string | undefined {
        return this._no_invoice
    }

    get buyers(): string | undefined {
        return this._buyers
    }

    get status(): string | undefined {
        return this._buyers
    }

    get sort_by(): string | undefined {
        return this._sort_by
    }
    get user_uuid(): string | undefined {
        return this._user_uuid
    }
    get page(): number | undefined {
        return this._page
    }

    get limit(): number | undefined {
        return this._limit
    }
}

export default GetPaymentRequest;
