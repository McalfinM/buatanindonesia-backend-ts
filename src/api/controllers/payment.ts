import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import { ISellerRequestService } from "../../services/interfaces/sellerRequest";
import { ISellerRequestController } from "./interfaces/sellerRequest";
import GetSellerRequest from "../../request/sellerRequest/getSellerRequest";
import { IPaymentService } from "../../services/interfaces/payment";
import CreatePaymentRequest from "../../request/payment/CreatePaymentRequest";
import GetPaymentRequest from "../../request/payment/getPaymentRequest";
import { IPaymentController } from "./interfaces/payment";
const mac = require('node-macaddress')


@injectable()
class PaymentController implements IPaymentController {
    constructor(@inject(TYPES.PaymentService) private paymentService: IPaymentService) { }


    create(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user

        return this.paymentService.create(new CreatePaymentRequest(req.body), user)
            .then((result) => HttpResponse.created(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    createNonAuth(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        let macaddress = ""
        mac.one(function (err: any, mac: any) {
            macaddress = mac
        });
        return this.paymentService.createNonAuth(new CreatePaymentRequest(req.body), user, macaddress)
            .then((result) => HttpResponse.created(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;
        const user = req.user
        console.log(uuid)
        return this.paymentService.findOne(uuid, user.uuid)
            .then((result) => HttpResponse.success(req, res, result?.toDetailData()))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
    index(req: Request, res: Response): Response | Promise<Response> {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal: string = page?.toString() ?? "1";
        const limitVal: string = limit?.toString() ?? "30";
        const user = req.user
        return this.paymentService.index(new GetPaymentRequest(query), user)
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

    uploadPayment(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        const { params: { uuid } } = req
        const { body: { image, cloudinary_id } } = req
        return this.paymentService.uploadPayment(uuid, image, user.uuid)
            .then(result => {

                return HttpResponse.success(req, res, { success: true });
            }).catch(err => HttpErrorHandler(err, req, res))
    }

    confirmItemDelivery(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        const { params: { uuid } } = req
        const { body: { image, cloudinary_id } } = req
        return this.paymentService.confirmItemDelivery(uuid, user.uuid)
            .then(result => {
                return HttpResponse.success(req, res, { success: true });
            }).catch(err => HttpErrorHandler(err, req, res))
    }

    findAllBySellerUuid(req: Request, res: Response): Response | Promise<Response> {
        const { query } = req;
        const { page, limit, sort, ...rest } = req.query;
        const pageVal: string = page?.toString() ?? "1";
        const limitVal: string = limit?.toString() ?? "30";
        const user = req.user

        return this.paymentService.indexSeller(new GetPaymentRequest(query), user)
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

    confirmItemOngoing(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        const { params: { uuid } } = req
        return this.paymentService.confirmItemOngoing(uuid, user.uuid)
            .then(result => {
                return HttpResponse.success(req, res, { success: true });
            }).catch(err => HttpErrorHandler(err, req, res))
    }

}

export default PaymentController
