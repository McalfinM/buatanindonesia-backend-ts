import { Request, Response } from 'express'

export interface IPaymentController {
    create(req: Request, res: Response): Response | Promise<Response>
    findOne(req: Request, res: Response): Response | Promise<Response>
    index(req: Request, res: Response): Response | Promise<Response>
    createNonAuth(req: Request, res: Response): Response | Promise<Response>
    uploadPayment(req: Request, res: Response): Response | Promise<Response>
    confirmItemDelivery(req: Request, res: Response): Response | Promise<Response>
    findAllBySellerUuid(req: Request, res: Response): Response | Promise<Response>
    confirmItemOngoing(req: Request, res: Response): Response | Promise<Response>
}
