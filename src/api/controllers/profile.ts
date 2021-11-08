import { Response, Request } from "express";
import HttpResponse from '../../helpers/httpResponse';
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { HttpErrorHandler } from "../../helpers/errors";
import CreateSellerRequest from "../../request/sellerRequest/createSellerRequest";
import GetSellerRequest from "../../request/sellerRequest/getSellerRequest";
import { IProfileController } from "./interfaces/profile";
import { IProfileService } from "../../services/interfaces/profile";
import UpdateProfileRequest from "../../request/profile/updateProfileRequest";
import GetProfileRequest from "../../request/profile/getProfileRequest";

@injectable()
class ProfileController implements IProfileController {
    constructor(@inject(TYPES.ProfileService) private profileService: IProfileService) { }


    update(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        return this.profileService.update(new UpdateProfileRequest(req.body), user)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }

    findOne(req: Request, res: Response): Response | Promise<Response> {

        const { params: { uuid } } = req;

        return this.profileService.findOne(uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
    findOneBySlug(req: Request, res: Response): Response | Promise<Response> {

        const { params: { slug } } = req;

        return this.profileService.findOne(slug)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
    index(req: Request, res: Response): Response | Promise<Response> {

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
        return this.profileService.index(new GetProfileRequest(query))

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

    findMyProfile(req: Request, res: Response): Response | Promise<Response> {
        const user = req.user
        return this.profileService.findOne(user.uuid)
            .then((result) => HttpResponse.success(req, res, result))
            .catch((err) => HttpErrorHandler(err, req, res));
    }
}

export default ProfileController
