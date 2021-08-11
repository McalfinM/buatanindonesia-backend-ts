
import { IUser } from "../../models/interfaces/user";
import ISpecification from "./specificationInterface";


class GetProductSpecification implements ISpecification {
    protected _name?: string;
    protected _stock?: string;
    protected _price?: string;
    protected _sort_by: any;
    protected _page: number;
    protected _limit: number;
    protected _search?: string;
    protected _user?: IUser;

    constructor(request: {

        name?: string
        card_holder_name?: string
        stock?: string
        price?: string
        sort?: string
        page?: number
        limit?: number
        search?: string
        user?: IUser
    }) {
        this._search = request.search;
        this._stock = request.stock;
        this._name = request.name;
        this._price = request.price
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
                { 'name': new RegExp(this._search, 'i') }
            )
        }


        if (this._price) {
            specifications["price"] = this._price
        }

        if (this._stock) {
            specifications["stock"] = this._stock
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


export default GetProductSpecification;
