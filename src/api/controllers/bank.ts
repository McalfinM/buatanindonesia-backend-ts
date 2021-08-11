import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import { IBankController } from "./interfaces/bank";
import { IBankService } from "../../services/interfaces/bank";

@injectable()
class BankController implements IBankController {
    constructor(@inject(TYPES.BankService) private bankService: IBankService) { }


    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;

        return this.bankService.findOne(uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    async findAll(req: Request, res: Response): Promise<Response> {

        const { query } = req;

        return this.bankService.findAll(query)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
}

export default BankController
