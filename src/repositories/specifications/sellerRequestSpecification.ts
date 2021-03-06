
import ISpecification from "./specificationInterface";


class GetSellerRequestSpecification implements ISpecification {
    protected _card_holder_name?: string;
    protected _name?: string;
    protected _email?: string;
    protected _status?: string;
    protected _sort_by: any;
    protected _roles: string[]
    protected _page: number;
    protected _limit: number;
    protected _search?: string;

    constructor(request: {

        name?: string
        card_holder_name?: string
        email?: string
        status?: string
        sort?: string
        roles?: string[]
        page?: number
        limit?: number
        search?: string
    }) {
        this._search = request.search;
        this._email = request.email;
        this._name = request.name;
        this._status = request.status
        this._roles = request.roles ?? ['member'];
        this._sort_by = request.sort ?? '-created_at'
        this._page = request.page ?? 1
        this._limit = request.limit ?? 30
    }


    specifies(): object {
        let specifications: { [k: string]: any } = {};
        let or_specifications: object[] = [];

        if (this._search) {

            or_specifications.push(
                { 'email': new RegExp(this._search, 'i') },
                { 'created_by.name': new RegExp(this._search, 'i') }
            )
        }


        if (this._status) {
            specifications["status"] = this._status
        }

        if (or_specifications.length > 0) {
            specifications["$or"] = or_specifications;
        }
        specifications.deleted_at = null;
        specifications.is_active = true

        return specifications;
    }

    specSort(): object {
        let specifications: { [k: string]: any } = {};

        if (this._sort_by[0] == '-') {
            specifications[this._sort_by.slice(1)] = -1
        } else {
            specifications[this._sort_by] = 1
        }

        return specifications;
    }

    paginate(): object {
        const specification: {
            limit: number
            skip: number
        } = {
            limit: +this._limit,
            skip: 0
        }

        if (this._page > 1) {
            specification.skip = (this._page - 1) * this._limit
        }
        return specification
    }

}


export default GetSellerRequestSpecification;
