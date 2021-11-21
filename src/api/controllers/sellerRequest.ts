import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import CreateSellerRequest from "../../request/sellerRequest/createSellerRequest";
import { ISellerRequestService } from "../../services/interfaces/sellerRequest";
import { ISellerRequestController } from "./interfaces/sellerRequest";
import GetSellerRequest from "../../request/sellerRequest/getSellerRequest";

@injectable()
class SellerRequestController implements ISellerRequestController {
    constructor(@inject(TYPES.SellerRequestService) private sellerRequestService: ISellerRequestService) { }


    create(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        const file: any = req.files
        return this.sellerRequestService.create(new CreateSellerRequest({
            ...req.body,
            image: file.image[0].path,
            ktp_image: file.ktp_image[0].path,
        }), user)
            .then((result) => HttpResponse.created(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }


    update(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        const { params: { uuid } } = req
        return this.sellerRequestService.update(uuid, new CreateSellerRequest(req.body), user)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;

        return this.sellerRequestService.findOne(uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
    index(req: Request, res: Response): Response | Promise<Response> {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal: string = page?.toString() ?? "1";
        const limitVal: string = limit?.toString() ?? "30";

        return this.sellerRequestService.index(new GetSellerRequest(query))
            .then((result) => {
                res.setHeader("X-Pagination-Total-Page", Math.ceil(result.total / +limitVal));
                res.setHeader("X-Pagination-Total-Data", result.total || 0);
                res.setHeader("X-Pagination-Current-Page", pageVal);
                res.setHeader("X-Pagination-Limit", limitVal);

                const sellerRequest = result.data.map((data) => data.toListData());
                return HttpResponse.success(req, res, sellerRequest);
            })
            .catch(err => HttpErrorHandler(err, req, res))
    }
    UpdateToSeller(req: Request, res: Response): Response | Promise<Response> {
        const { params: { uuid } } = req;

        return this.sellerRequestService.updateToSeller(uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    delete(req: Request, res: Response): Response | Promise<Response> {
        const { params: { uuid } } = req;
        const user = req.user
        return this.sellerRequestService.delete(uuid, user.uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOneByUserUuid(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        return this.sellerRequestService.findOneByUserUuid(user.uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
}

export default SellerRequestController
