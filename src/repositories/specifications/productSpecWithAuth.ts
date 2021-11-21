
import { IUser } from "../../models/interfaces/user";
import ISpecification from "./specificationInterface";


class GetProductSpecificationWithAuth implements ISpecification {
    protected _name?: string;
    protected _city?: string;
    protected _price?: string;
    protected _sort_by: any;
    protected _page: number;
    protected _limit: number;
    protected _search?: string;
    protected _user_uuid?: string;
    protected _is_active?: boolean

    constructor(request: {

        name?: string
        card_holder_name?: string
        city?: string
        price?: string
        sort?: string
        page?: number
        limit?: number
        search?: string
        user_uuid?: string
        is_active?: boolean
    }) {
        this._search = request.search;
        this._city = request.city;
        this._name = request.name;
        this._price = request.price
        this._sort_by = request.sort ?? '-created_at'
        this._page = request.page ?? 1
        this._limit = request.limit ?? 30
        this._user_uuid = request.user_uuid
        this._is_active = request.is_active ?? true
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

        if (this._city) {
            specifications["city.uuid"] = this._city
        }

        if (or_specifications.length > 0) {
            specifications["$or"] = or_specifications;
        }
        specifications.deleted_at = null;
        specifications.is_active = this._is_active
        specifications['created_by.uuid'] = this._user_uuid

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


export default GetProductSpecificationWithAuth;
