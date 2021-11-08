
import { injectable } from "inversify";
import PaymentEntity from "../entities/payment";
import { IPaymentRepository } from "./interfaces/payment";
import { v4 as uuidV4 } from 'uuid'
import specificationInterface from "./specifications/specificationInterface";
import PaymentModel from "../models/payment";
import { PaymentMethod, StatusOrder, StatusPayment } from "../entities/enums/enum";


@injectable()
class PaymentRepository implements IPaymentRepository {
    async create(data: PaymentEntity): Promise<{ success: true }> {
        await PaymentModel.create({
            uuid: uuidV4(),
            email: data.email,
            address: data.address,
            card_number: data.card_name ?? null,
            card_name: data.card_name ?? null,
            cloudinary_id: data.cloudinary_id ?? null,
            created_by: data.created_by,
            delivery_date: data.delivery_date,
            idempotency: data.idempotency,
            image: data.image,
            notes: data.notes,
            no_invoice: data.no_invoice,
            payment_method: data.payment_method,
            phone: data.phone,
            product: data.product,
            quantity: data.quantity,
            seller_by: data.seller_by,
            status: data.status,
            status_payment: data.status_payment,
            total_price: data.total_price,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,

        })
        return { success: true }
    }
    async update(data: PaymentEntity): Promise<{ success: true }> {
        console.log(data, 'ini enti')
        const result = await PaymentModel.updateOne({ uuid: data.uuid, deleted_at: null }, {
            ...data.toJson()
        })

        return { success: true }
    }
    async findOne(uuid: string, user_uuid: string): Promise<PaymentEntity | null> {
        const result = await PaymentModel.findOne({ uuid: uuid, "created_by.uuid": user_uuid, deleted_at: null })

        return result ? new PaymentEntity(result) : null
    }

    async findOneSeller(uuid: string, user_uuid: string): Promise<PaymentEntity | null> {
        const result = await PaymentModel.findOne({ uuid: uuid, "seller_by.uuid": user_uuid, deleted_at: null })

        return result ? new PaymentEntity(result) : null
    }

    async findOneWithUser(uuid: string, user_uuid: string): Promise<PaymentEntity | null> {
        const result = await PaymentModel.findOne({ uuid: uuid, "created_by.uuid": user_uuid, deleted_at: null })

        return result ? new PaymentEntity(result) : null
    }

    async findOneByNoInvoice(no_invoice: string, user_uuid: string): Promise<PaymentEntity | null> {
        console.log(no_invoice, user_uuid, 'ini')
        const result = await PaymentModel.findOne({ no_invoice: no_invoice, "created_by.uuid": user_uuid, deleted_at: null })

        return result ? new PaymentEntity(result) : null
    }

    async delete(uuid: string, user_uuid: string): Promise<{ success: true }> {
        const result = await PaymentModel.updateOne({ uuid: uuid, "created.by": user_uuid }, {
            deleted_at: new Date
        })

        return { success: true }
    }

    async findAll(
        specification: specificationInterface
    ): Promise<{
        total: number;
        data: PaymentEntity[];
    }> {
        const total_customer = await PaymentModel.find({

            ...specification.specifies(),
        }).countDocuments();
        return PaymentModel.find(
            {
                ...specification.specifies(),
            },
            {},
            {
                ...specification.paginate(),
                sort: specification.specSort(),
            }
        )
            .then((result) => {
                return {
                    total: total_customer,
                    data: result.map((data) => {
                        return new PaymentEntity({
                            ...data.toJSON()
                        });
                    }),
                };
            })
            .catch((err) => {
                return err;
            });
    }

    async findPaymentStillNoPay(user_uuid: string): Promise<PaymentEntity | null> {
        const payment = await PaymentModel.findOne({
            "created_by.uuid": user_uuid,
            status: StatusOrder.ORDER
        })

        return payment ? new PaymentEntity(payment) : null
    }

}

export default PaymentRepository;
