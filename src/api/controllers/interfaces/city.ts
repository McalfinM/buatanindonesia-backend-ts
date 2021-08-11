import { Request, Response } from 'express'

export interface ICityController {
    findOne(req: Request, res: Response): Response | Promise<Response>
    findAll(req: Request, res: Response): Response | Promise<Response>
}
