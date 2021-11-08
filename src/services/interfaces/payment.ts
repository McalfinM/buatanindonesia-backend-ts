
import PaymentEntity from '../../entities/payment'
import { IUser } from '../../models/interfaces/user'
import CreatePaymentRequest from '../../request/payment/CreatePaymentRequest'
import GetPaymentRequest from '../../request/payment/getPaymentRequest'

export interface IPaymentService {
    create(data: CreatePaymentRequest, user: IUser): Promise<{ success: true }>
    createNonAuth(data: CreatePaymentRequest, user: IUser, macaddress: string): Promise<{ success: true }>
    findOne(uuid: string, user_uuid: string): Promise<PaymentEntity | null>
    index(
        data: GetPaymentRequest,
        user: IUser
    ): Promise<{
        total: number;
        data: PaymentEntity[];
    }>
    uploadPayment(uuid: string, image: string, user_uuid: string): Promise<void>
    confirmItemDelivery(uuid: string, user_uuid: string): Promise<void>
    indexSeller(
        data: GetPaymentRequest,
        user: IUser
    ): Promise<{
        total: number;
        data: PaymentEntity[];
    }>
    confirmItemOngoing(uuid: string, user_uuid: string): Promise<void>
}
