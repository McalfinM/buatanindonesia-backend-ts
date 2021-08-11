import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { IProvinceService } from "../../services/interfaces/province";
import { IProvinceController } from "./interfaces/province";
import { HttpErrorHandler } from "../../helpers/errors";

@injectable()
class ProvinceController implements IProvinceController {
    constructor(@inject(TYPES.ProvinceService) private provinceService: IProvinceService) { }


    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;

        return this.provinceService.findOne(uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    async findAll(req: Request, res: Response): Promise<Response> {

        const { query } = req;

        return this.provinceService.findAll(query)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
}

export default ProvinceController
