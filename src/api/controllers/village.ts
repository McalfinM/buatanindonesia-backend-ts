import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import { IVillageController } from "./interfaces/village";
import { IVillageSerivce } from "../../services/interfaces/village";

@injectable()
class VillageController implements IVillageController {
    constructor(@inject(TYPES.VillageService) private villageService: IVillageSerivce) { }


    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;

        return this.villageService.findOne(uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    async findAll(req: Request, res: Response): Promise<Response> {

        const { query } = req;

        return this.villageService.findAll(query)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
}

export default VillageController
