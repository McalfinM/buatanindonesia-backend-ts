"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const payment_1 = __importDefault(require("../entities/payment"));
const uuid_1 = require("uuid");
const payment_2 = __importDefault(require("../models/payment"));
let PaymentRepository = class PaymentRepository {
    async create(data) {
        await payment_2.default.create({
            uuid: uuid_1.v4(),
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
            total_price: data.total_price,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,
        });
        return { success: true };
    }
    async update(data) {
        const result = await payment_2.default.updateOne({ uuid: data.uuid, deleted_at: null }, {
            ...data.toJson()
        });
        return { success: true };
    }
    async findOne(uuid, user_uuid) {
        const result = await payment_2.default.findOne({ uuid: uuid, "created_by.uuid": user_uuid, deleted_at: null });
        return result ? new payment_1.default(result) : null;
    }
    async findOneWithUser(uuid, user_uuid) {
        const result = await payment_2.default.findOne({ uuid: uuid, "created_by.uuid": user_uuid, deleted_at: null });
        return result ? new payment_1.default(result) : null;
    }
    async findOneBySlug(slug) {
        const result = await payment_2.default.findOne({ slug: slug, deleted_at: null });
        return result ? new payment_1.default(result) : null;
    }
    async delete(uuid, user_uuid) {
        const result = await payment_2.default.updateOne({ uuid: uuid, "created.by": user_uuid }, {
            deleted_at: new Date
        });
        return { success: true };
    }
    async findAll(specification) {
        const total_customer = await payment_2.default.find({
            ...specification.specifies(),
        }).countDocuments();
        return payment_2.default.find({
            ...specification.specifies(),
        }, {}, {
            ...specification.paginate(),
            sort: specification.specSort(),
        })
            .then((result) => {
            return {
                total: total_customer,
                data: result.map((data) => {
                    return new payment_1.default({
                        ...data.toJSON()
                    });
                }),
            };
        })
            .catch((err) => {
            return err;
        });
    }
};
PaymentRepository = __decorate([
    inversify_1.injectable()
], PaymentRepository);
exports.default = PaymentRepository;
