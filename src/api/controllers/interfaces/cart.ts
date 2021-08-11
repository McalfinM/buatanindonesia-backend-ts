import { Request, Response } from 'express'

export interface ICartController {
    createOrUpdate(req: Request, res: Response): Promise<Response>
    findOne(req: Request, res: Response): Promise<Response>
    findAll(req: Request, res: Response): Promise<Response>
    delete(req: Request, res: Response): Promise<Response>
}