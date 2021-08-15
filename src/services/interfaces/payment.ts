
import PaymentEntity from '../../entities/payment'
import { IUser } from '../../models/interfaces/user'
import CreatePaymentRequest from '../../request/payment/CreatePaymentRequest'
import GetPaymentRequest from '../../request/payment/getPaymentRequest'

export interface IPaymentService {
    create(data: CreatePaymentRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string, user_uuid: string): Promise<PaymentEntity | null>
    index(
        data: GetPaymentRequest
    ): Promise<{
        total: number;
        data: PaymentEntity[];
    }>

}
