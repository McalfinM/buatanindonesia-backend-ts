import { Request, Response } from 'express'

export interface IUserController {
    create(req: Request, res: Response): Promise<Response>
    update(req: Request, res: Response): Response | Promise<Response>
}
