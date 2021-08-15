import PaymentEntity from "../../entities/payment";
import specificationInterface from "../specifications/specificationInterface";

export interface IPaymentRepository {
    create(data: PaymentEntity): Promise<{ success: true }>
    update(data: PaymentEntity): Promise<{ success: true }>
    findOne(uuid: string, user_uuid: string): Promise<PaymentEntity | null>
    findAll(specification: specificationInterface): Promise<{ total: number, data: PaymentEntity[] }>
    delete(uuid: string, user_uuid: string): Promise<{ success: true }>
}
