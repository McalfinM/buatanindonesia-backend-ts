import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import { IDistrictController } from "./interfaces/district";
import { IDistrictService } from "../../services/interfaces/district";

@injectable()
class DistrictController implements IDistrictController {
    constructor(@inject(TYPES.DistrictService) private districtService: IDistrictService) { }


    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;

        return this.districtService.findOne(uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    async findAll(req: Request, res: Response): Promise<Response> {

        const { query } = req;

        return this.districtService.findAll(query)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
}

export default DistrictController
