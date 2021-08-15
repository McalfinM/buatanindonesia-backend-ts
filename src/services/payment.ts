import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { EventDispatcher } from "event-dispatch";
import { IUser } from "../models/interfaces/user";
import { IPaymentService } from "./interfaces/payment";
import { IPaymentRepository } from "../repositories/interfaces/payment";
import CreatePaymentRequest from "../request/payment/CreatePaymentRequest";
import { IProfileService } from "./interfaces/profile";
import { ErrorNotFound } from "../helpers/errors";
import { IProductService } from "./interfaces/product";
import PaymentEntity from "../entities/payment";
import GetPaymentRequest from "../request/payment/getPaymentRequest";
import GetPaymentSpecification from "../repositories/specifications/paymentSpecification";

@injectable()
class PaymentService implements IPaymentService {

    constructor(
        @inject(TYPES.PaymentRepository) private paymentRepository: IPaymentRepository,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.ProductService) private productService: IProductService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreatePaymentRequest, user: IUser): Promise<{ success: true }> {
        const searchUser = await this.profileService.findOne(user.uuid)
        const searchSeller = await this.profileService.findOne(data.seller_uuid)
        if (!searchSeller) throw new ErrorNotFound('Seller maybe not active now', '@Service payment service create')
        if (!searchUser) throw new ErrorNotFound('User not found', '@Service Payment Service create')
        if (searchUser.created_by.uuid == searchSeller.created_by.uuid) throw new ErrorNotFound('Cant continue this transaction', '@Service create payment')
        const searchProduct = await this.productService.findOne(data.product_uuid)
        if (!searchProduct) throw new ErrorNotFound('Product not found', '@Service Payment Service create')
        const paymentEntity = new PaymentEntity({
            uuid: uuidv4(),
            no_invoice: 'MS' + Math.random().toString(50).substring(2, 10),
            address: data.address,
            delivery_date: data.delivery_date,
            phone: data.phone,
            email: data.email,
            notes: data.notes,
            payment_method: data.payment_method,
            card_number: data.card_number ?? null,
            idempotency: data.idempotency ?? '',
            created_by: {
                uuid: searchUser.uuid,
                image: searchUser.image,
                name: searchUser.created_by.name
            } ?? null,
            seller_by: {
                uuid: searchSeller.uuid,
                name: searchSeller.created_by.name,
                image: searchSeller.image
            },
            status: data.status,
            card_name: data.card_name ?? '',
            quantity: data.quantity,
            product: {
                product_uuid: searchProduct.uuid,
                name: searchProduct.name,
                image: searchProduct.image,
                price: searchProduct.price,
                seller_by: {
                    uuid: searchSeller.uuid,
                    name: searchSeller.created_by.name,
                    image: searchSeller.image
                },
                slug: searchProduct.slug,
                quantity: searchProduct.stock
            },
            total_price: data.total_price ?? 0,
            image: data.image ?? 'https://res.cloudinary.com/dti2eqvdi/image/upload/v1627998960/profile/No_Image_Available_kvppd7.jpg',
            cloudinary_id: data.cloudinary_id ?? null,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        })
        return { success: true }
    }

    async findOne(uuid: string, user_uuid: string): Promise<PaymentEntity | null> {
        const result = await this.paymentRepository.findOne(uuid, user_uuid)

        return result
    }

    async index(
        data: GetPaymentRequest
    ): Promise<{
        total: number;
        data: PaymentEntity[];
    }> {
        return await this.paymentRepository.findAll(
            new GetPaymentSpecification(data)
        );
    }



}

export default PaymentService
