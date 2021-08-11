import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import CreateLikeRequest from "../../request/like/createLikeRequest";
import { ICartController } from "./interfaces/cart";
import { ICartService } from "../../services/interfaces/cart";
import CreateCartRequest from "../../request/cart/cart";
@injectable()
class CartController implements ICartController {

    constructor(
        @inject(TYPES.CartService) private cartService: ICartService
    ) { }


    createOrUpdate(req: Request, res: Response): Promise<Response> {
        const user = req.user
        return this.cartService.createOrUpdate(new CreateCartRequest(req.body), user)
            .then((result) => {
                return HttpResponse.created(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Promise<Response> {

        const { params: { uuid } } = req
        const user = req.user
        return this.cartService.findOne(uuid, user.uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    delete(req: Request, res: Response): Promise<Response> {

        const { params: { uuid } } = req
        const user = req.user
        return this.cartService.delete(uuid, user.uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result);
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findAll(req: Request, res: Response): Promise<Response> {
        const user = req.user
        return this.cartService.findAll(user.uuid)
            .then((result) => {
                return HttpResponse.success(req, res, result.map((data) => data.toListData()));
            })
            .catch((err) => HttpErrorHandler(err, req, res));
    }

}

export default CartController
