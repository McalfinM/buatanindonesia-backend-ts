import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { EventDispatcher } from "event-dispatch";
import { IUser } from "../models/interfaces/user";
import { IPaymentService } from "./interfaces/payment";
import { IPaymentRepository } from "../repositories/interfaces/payment";
import CreatePaymentRequest from "../request/payment/CreatePaymentRequest";
import { IProfileService } from "./interfaces/profile";
import { ErrorBadRequest, ErrorNotFound } from "../helpers/errors";
import { IProductService } from "./interfaces/product";
import PaymentEntity from "../entities/payment";
import GetPaymentRequest from "../request/payment/getPaymentRequest";
import GetPaymentSpecification from "../repositories/specifications/paymentSpecification";
import { PaymentMethod, StatusOrder, StatusPayment } from "../entities/enums/enum";
import { ICartService } from "./interfaces/cart";

@injectable()
class PaymentService implements IPaymentService {

    constructor(
        @inject(TYPES.PaymentRepository) private paymentRepository: IPaymentRepository,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.ProductService) private productService: IProductService,
        @inject(TYPES.CartService) private cartService: ICartService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }

    async create(data: CreatePaymentRequest, user: IUser): Promise<{ success: true }> {
        const searchUser = await this.profileService.findOne(user.uuid)
        if (!searchUser) throw new ErrorNotFound('User not found', '@Service Payment Service create')
        const payment = await this.paymentRepository.findPaymentStillNoPay(user.uuid)
        if (payment?.status_payment == StatusPayment.AWAITINGPAYMENT && payment.payment_method == PaymentMethod.BANKTRANSFER) {
            throw new ErrorBadRequest('Kamu masih mempunyai barang yang menunggu untuk di bayar', '@Service Payment => Create')
        } else if (payment?.status_payment == StatusPayment.AWAITINGPAYMENT && payment.status == StatusOrder.ORDER) {
            throw new ErrorBadRequest('Kamu masih mempunyai barang COD untuk di bayar', '@Service Payment => Create')
        }
        const searchProduct = await this.productService.findOne(data.id)
        if (!searchProduct) throw new ErrorNotFound('Product not found', '@Service Payment Service create')
        if (searchProduct.stock == 0) throw new ErrorNotFound('Maaf produk telah habis', '@Service Payment create')
        const searchSeller = await this.profileService.findOne(searchProduct?.created_by.uuid ?? '')
        if (!searchSeller) throw new ErrorNotFound('Seller maybe not active now', '@Service payment service create')
        if (searchUser.created_by.uuid == searchSeller.created_by.uuid) throw new ErrorNotFound('Cant continue this transaction', '@Service create payment')
        const paymentEntity = new PaymentEntity({
            uuid: uuidv4(),
            no_invoice: 'MS' + Math.random().toString(20).substring(2, 10),
            address: data.address,
            delivery_date: data.delivery_date,
            phone: data.phone,
            email: data.email ?? searchUser.email,
            notes: data.notes ?? null,
            payment_method: data.payment_method,
            card_number: data.card_number ?? null,
            idempotency: data.idempotency ?? '',
            created_by: {
                uuid: searchUser.created_by.uuid,
                image: searchUser.image,
                name: searchUser.created_by.name
            } ?? null,
            seller_by: {
                uuid: searchSeller.created_by.uuid,
                name: searchSeller.created_by.name,
                image: searchSeller.image
            },
            status: StatusOrder.ORDER,
            status_payment: StatusPayment.AWAITINGPAYMENT,
            card_name: data.card_name ?? null,
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
            image: data.image ?? '',
            macaddress: null,
            cloudinary_id: data.cloudinary_id ?? null,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        })
        await this.paymentRepository.create(paymentEntity)
        return { success: true }
    }
    async createNonAuth(data: CreatePaymentRequest, user: IUser, macaddress: string): Promise<{ success: true }> {
        const searchProduct = await this.productService.findOne(data.id)
        if (!searchProduct) throw new ErrorNotFound('Product not found', '@Service Payment Service create')
        if (searchProduct.stock == 0) throw new ErrorNotFound('Maaf produk telah habis', '@Service Payment create')
        const searchSeller = await this.profileService.findOne(searchProduct?.created_by.uuid ?? '')
        if (!searchSeller) throw new ErrorNotFound('Seller maybe not active now', '@Service payment service create')
        const paymentEntity = new PaymentEntity({
            uuid: uuidv4(),
            no_invoice: 'MS' + Math.random().toString(20).substring(2, 10),
            address: data.address,
            delivery_date: data.delivery_date,
            phone: data.phone,
            email: data.email,
            notes: data.notes ?? null,
            payment_method: data.payment_method,
            card_number: data.card_number ?? null,
            idempotency: data.idempotency ?? '',
            created_by: {} ?? null,
            seller_by: {
                uuid: searchSeller.uuid,
                name: searchSeller.created_by.name,
                image: searchSeller.image
            },
            status: StatusOrder.ORDER,
            card_name: data.card_name ?? null,
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
            image: data.image ?? '',
            status_payment: StatusPayment.AWAITINGPAYMENT,
            cloudinary_id: data.cloudinary_id ?? null,
            macaddress: macaddress,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        })
        await this.paymentRepository.create(paymentEntity)
        return { success: true }
    }
    async findOne(uuid: string, user_uuid: string): Promise<PaymentEntity | null> {
        console.log(uuid)
        const result = await this.paymentRepository.findOneByNoInvoice(uuid, user_uuid)

        return result
    }

    async index(
        data: GetPaymentRequest,
        user: IUser
    ): Promise<{
        total: number;
        data: PaymentEntity[];
    }> {
        return await this.paymentRepository.findAll(
            new GetPaymentSpecification({
                invoice: data.no_invoice,
                name: data.name,
                search: data.search,
                limit: data.limit,
                page: data.page,
                sort: data.sort_by,
                user: user,
            })
        );
    }

    async uploadPayment(uuid: string, image: string, user_uuid: string): Promise<void> {
        const payment = await this.paymentRepository.findOne(uuid, user_uuid)
        if (!payment) throw new ErrorNotFound('Data tidak ditemukan', '@Service Payment => uploadPayment')
        const entity = new PaymentEntity({
            ...payment.toJSON(),
            image: image,
            status_payment: StatusPayment.VALIDATIONPROCESS
        })
        await this.paymentRepository.update(entity)
    }

    async confirmItemDelivery(uuid: string, user_uuid: string): Promise<void> {

        const payment = await this.paymentRepository.findOne(uuid, user_uuid)
        if (!payment) throw new ErrorNotFound('Data tidak ditemukan', '@Service Payment => uploadPayment')
        const entity = new PaymentEntity({
            ...payment.toJSON(),
            status_payment: StatusPayment.PAID,
            status: StatusOrder.DONE
        })
        await this.paymentRepository.update(entity)
    }


    async confirmItemOngoing(uuid: string, user_uuid: string): Promise<void> {

        const payment = await this.paymentRepository.findOneSeller(uuid, user_uuid)
        if (!payment) throw new ErrorNotFound('Data tidak ditemukan', '@Service Payment => uploadPayment')
        const entity = new PaymentEntity({
            ...payment.toJSON(),
            status: StatusOrder.ONGOING
        })
        await this.paymentRepository.update(entity)
    }

    async indexSeller(
        data: GetPaymentRequest,
        user: IUser
    ): Promise<{
        total: number;
        data: PaymentEntity[];
    }> {
        const place = 'seller'
        return await this.paymentRepository.findAll(
            new GetPaymentSpecification({
                invoice: data.no_invoice,
                name: data.name,
                search: data.search,
                limit: data.limit,
                page: data.page,
                sort: data.sort_by,
                user: user,
                place: place
            })
        );
    }

}

export default PaymentService
