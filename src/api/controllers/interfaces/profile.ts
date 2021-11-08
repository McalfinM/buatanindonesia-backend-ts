import { Request, Response } from 'express'

export interface IProfileController {
    update(req: Request, res: Response): Response | Promise<Response>
    index(req: Request, res: Response): Response | Promise<Response>
    findOne(req: Request, res: Response): Response | Promise<Response>
    findOneBySlug(req: Request, res: Response): Response | Promise<Response>
    findMyProfile(req: Request, res: Response): Response | Promise<Response>
}
