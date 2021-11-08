import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import CreateSellerRequest from "../../request/sellerRequest/createSellerRequest";
import GetSellerRequest from "../../request/sellerRequest/getSellerRequest";
import { IProductController } from "./interfaces/product";
import { IProductService } from "../../services/interfaces/product";
import CreateProductRequest from "../../request/product/createProductRequest";
import GetProductRequest from "../../request/product/getProductRequest";

@injectable()
class ProductController implements IProductController {
    constructor(@inject(TYPES.ProductService) private productService: IProductService) { }


    create(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        return this.productService.create(new CreateProductRequest(req.body), user)
            .then((result) => HttpResponse.created(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }


    update(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        const { params: { uuid } } = req
        return this.productService.update(uuid, new CreateProductRequest(req.body), user)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;

        return this.productService.findOne(uuid)
            .then((result) => HttpResponse.success(req, res, result?.toDetailData()))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
    findAll(req: Request, res: Response): Response | Promise<Response> {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal: string = page?.toString() ?? "1";
        const limitVal: string = limit?.toString() ?? "30";

        let obj = {
            totalPage: 0,
            totalData: 0,
            currentPage: '',
            limit: '',
            data: [{}]
        }

        return this.productService.findAll(new GetProductRequest(query))
            .then((result) => {
                obj.totalPage = Math.ceil(result.total / +limitVal)
                obj.totalData = result.total || 0
                obj.currentPage = pageVal
                obj.limit = limitVal
                // res.setHeader("X-Pagination-Total-Page", Math.ceil(result.total / +limitVal));
                // res.setHeader("X-Pagination-Total-Data", result.total || 0);
                // res.setHeader("X-Pagination-Current-Page", pageVal);
                // res.setHeader("X-Pagination-Limit", limitVal);
                obj.data = result.data.map((data) => data.toListData());

                return HttpResponse.success(req, res, obj);
            })

            .catch(err => HttpErrorHandler(err, req, res))
    }

    delete(req: Request, res: Response): Response | Promise<Response> {
        const { params: { uuid } } = req;
        const user = req.user
        return this.productService.delete(uuid, user.uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
    findOneBySlug(req: Request, res: Response): Response | Promise<Response> {
        const { params: { slug } } = req;
        const user = req.user
        return this.productService.findOneBySlug(slug)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findAllWithUser(req: Request, res: Response): Response | Promise<Response> {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal: string = page?.toString() ?? "1";
        const limitVal: string = limit?.toString() ?? "30";
        let obj = {
            totalPage: 0,
            totalData: 0,
            currentPage: '',
            limit: '',
            data: [{}]
        }
        const user = req.user
        return this.productService.findAllWithUser(new GetProductRequest({
            ...query,
            user_uuid: user.uuid
        }))
            .then((result) => {
                obj.totalPage = Math.ceil(result.total / +limitVal)
                obj.totalData = result.total || 0
                obj.currentPage = pageVal
                obj.limit = limitVal
                // res.setHeader("X-Pagination-Total-Page", Math.ceil(result.total / +limitVal));
                // res.setHeader("X-Pagination-Total-Data", result.total || 0);
                // res.setHeader("X-Pagination-Current-Page", pageVal);
                // res.setHeader("X-Pagination-Limit", limitVal);
                obj.data = result.data.map((data) => data.toListData());

                return HttpResponse.success(req, res, obj);
            })


            .catch(err => HttpErrorHandler(err, req, res))
    }
}

export default ProductController
