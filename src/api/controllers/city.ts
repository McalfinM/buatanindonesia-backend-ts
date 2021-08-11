import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import { ICityController } from "./interfaces/city";
import { ICityService } from "../../services/interfaces/city";

@injectable()
class CityController implements ICityController {
    constructor(@inject(TYPES.CityService) private cityService: ICityService) { }


    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;

        return this.cityService.findOne(uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    async findAll(req: Request, res: Response): Promise<Response> {

        const { query } = req;

        return this.cityService.findAll(query)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
}

export default CityController
