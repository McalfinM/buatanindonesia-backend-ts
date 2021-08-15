
import { IUser } from "../../models/interfaces/user";
import ISpecification from "./specificationInterface";


class GetPaymentSpecification implements ISpecification {
    protected _invoice?: string;
    protected _name?: string;
    protected _email?: string;
    protected _sort_by: any;
    protected _page: number;
    protected _limit: number;
    protected _search?: string;
    protected _user?: IUser;

    constructor(request: {

        invoice?: string
        card_holder_invoice?: string
        name?: string
        email?: string
        sort?: string
        page?: number
        limit?: number
        search?: string
        user?: IUser
    }) {
        this._search = request.search;
        this._name = request.name;
        this._invoice = request.invoice;
        this._email = request.email
        this._sort_by = request.sort ?? '-created_at'
        this._page = request.page ?? 1
        this._limit = request.limit ?? 30
        this._user = request.user
    }


    specifies(): object {
        let specifications: { [k: string]: any } = {};
        let or_specifications: object[] = [];

        if (this._search) {

            or_specifications.push(
                { 'invoice': new RegExp(this._search, 'i') }
            )
        }


        if (this._email) {
            specifications["email"] = this._email
        }

        if (this._name) {
            specifications["name"] = this._name
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


export default GetPaymentSpecification;
