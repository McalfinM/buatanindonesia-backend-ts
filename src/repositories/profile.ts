
import { IUserRepository } from "./interfaces/user";
import { injectable } from "inversify";
import specificationInterface from "./specifications/specificationInterface";
import { IProfileRepository } from "./interfaces/profile";
import ProfileEntity from "../entities/profile";
import ProfileModel from "../models/profile";

@injectable()
class ProfileRepository implements IProfileRepository {
    async create(data: ProfileEntity): Promise<ProfileEntity> {
        const result = await ProfileModel.create({
            uuid: data.uuid,
            created_by: {
                uuid: data.created_by.uuid ?? '',
                name: data.created_by.name ?? '',
            },
            slug: data.slug,
            roles: data.roles,
            address: data.address,
            card_number: data.card_number,
            city: data.city,
            district: data.city,
            email: data.email ?? '',
            image: data.image,
            phone: data.phone,
            created_at: data.created_at,
            province: data.province,
            updated_at: data.updated_at,
            deleted_at: null
        })

        return data
    }

    async findOne(uuid: string): Promise<ProfileEntity | null> {

        const result = await ProfileModel.findOne({
            uuid: uuid,
            is_active: true,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        })

        return result ? new ProfileEntity(result) : null
    }

    async checkEmail(email: string): Promise<ProfileEntity | null> {

        const result = await ProfileModel.findOne({
            email: email,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        })

        return result ? new ProfileEntity(result) : null
    }

    async findOneByUuid(uuid: string): Promise<ProfileEntity | null> {

        const result = await ProfileModel.findOne({
            uuid: uuid,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        })

        return result ? new ProfileEntity(result) : null
    }

    async findOneBySlug(slug: string): Promise<ProfileEntity | null> {

        const result = await ProfileModel.findOne({
            slug: slug,
            $or: [{ deleted_at: undefined }, { deleted_at: null }]
        })

        return result ? new ProfileEntity(result) : null
    }

    async update(data: ProfileEntity): Promise<ProfileEntity> {

        const result = await ProfileModel.updateOne({ uuid: data.created_by.uuid ?? '' }, {
            data
        })
        return data
    }

    async chainUpdateFromProfile(name: string, uuid: string): Promise<{ success: true }> {
        console.log(name, uuid)
        const response = await ProfileModel.updateOne({ uuid: uuid }, {
            name: name
        })

        return { success: true }
    }

    async updateIsActiveTrue(user_uuid: string, is_active: boolean): Promise<{ success: true }> {

        const response = await ProfileModel.updateOne({ uuid: user_uuid }, {
            is_active: is_active
        })

        return { success: true }
    }

    async index(
        specification: specificationInterface
    ): Promise<{
        total: number;
        data: ProfileEntity[];
    }> {
        const total_customer = await ProfileModel.find({
            ...specification.specifies(),
        }).countDocuments();
        return ProfileModel.find(
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
                        return new ProfileEntity({
                            uuid: data.uuid,
                            created_by: {
                                uuid: data.created_by.uuid ?? '',
                                name: data.created_by.name ?? '',
                            },
                            slug: data.slug,
                            roles: data.roles,
                            address: data.address,
                            card_number: data.card_number,
                            city: data.city,
                            district: data.city,
                            email: data.email ?? '',
                            image: data.image,
                            phone: data.phone,
                            created_at: data.created_at,
                            province: data.province,
                            updated_at: data.updated_at,
                            deleted_at: null
                        });
                    }),
                };
            })
            .catch((err) => {
                return err;
            });
    }
}

export default ProfileRepository
