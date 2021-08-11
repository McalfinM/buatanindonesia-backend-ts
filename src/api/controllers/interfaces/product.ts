import { Request, Response } from 'express'
export interface IProductController {
    create(req: Request, res: Response): Response | Promise<Response>
    findOne(req: Request, res: Response): Response | Promise<Response>
    update(req: Request, res: Response): Response | Promise<Response>
    findOneBySlug(req: Request, res: Response): Response | Promise<Response>
    findAll(req: Request, res: Response): Response | Promise<Response>
    findAllWithUser(req: Request, res: Response): Response | Promise<Response>
    delete(req: Request, res: Response): Response | Promise<Response>
}