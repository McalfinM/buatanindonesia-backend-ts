
import { IUserRepository } from "./interfaces/user";
import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import SellerRequestEntity from "../entities/sellerRequest";
import SellerRequestModel from "../models/sellerRequest";
import { ISellerRequestRepository } from "./interfaces/sellerRequest";


@injectable()
class SellerRequestRepository implements ISellerRequestRepository {
    async create(data: SellerRequestEntity): Promise<SellerRequestEntity> {
        const result = await SellerRequestModel.create(data.toJSON())

        return new SellerRequestEntity(result)
    }

    async findOne(uuid: string): Promise<SellerRequestEntity | null> {
        const result = await SellerRequestModel.findOne({
            uuid: uuid,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        })

        return result ? new SellerRequestEntity(result) : null
    }

    async findOneByUserUuid(uuid: string): Promise<SellerRequestEntity | null> {
        console.log(uuid, 'uuid')
        const result = await SellerRequestModel.findOne({

            "created_by.uuid": uuid,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        })

        return result ? new SellerRequestEntity(result) : null
    }

    async update(data: SellerRequestEntity): Promise<SellerRequestEntity> {

        const result = await SellerRequestModel.updateOne({ uuid: data.uuid ?? '', deleted_at: null }, {
            ...data.toJson()
        })
        return data
    }

    async delete(uuid: string, user_uuid: string): Promise<{ success: true }> {

        const result = await SellerRequestModel.updateOne({ uuid: uuid ?? '', "created_by.uuid": user_uuid }, {
            deleted_at: new Date
        })
        return { success: true }
    }

    async index(
        specification: specificationInterface
    ): Promise<{
        total: number;
        data: SellerRequestEntity[];
    }> {
        const total_customer = await SellerRequestModel.find({
            ...specification.specifies(),
        }).countDocuments();
        return SellerRequestModel.find(
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
                        return new SellerRequestEntity({
                            uuid: data.uuid,
                            email: data.email,
                            card_holder_name: data.card_holder_name,
                            card_number: data.card_number,
                            created_by: data.created_by,
                            image: data.image,
                            bank: data.bank,
                            status: data.status,
                            phone: data.phone,
                            ktp_image: data.ktp_image,
                            address: data.address,
                            name: data.name,
                            province: data.province,
                            city: data.city,
                            district: data.district,
                            village: data.village,
                            created_at: data.created_at,
                            updated_at: data.updated_at,
                            deleted_at: data.deleted_at
                        });
                    }),
                };
            })
            .catch((err) => {
                return err;
            });
    }
}

export default SellerRequestRepository
