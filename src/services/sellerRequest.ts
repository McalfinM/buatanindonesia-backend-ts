
import { inject, injectable } from "inversify";
import { IUser } from "../models/interfaces/user";
import { TYPES } from "../types";
import { EventDispatcher } from "event-dispatch";
import { v4 as uuid } from 'uuid'
import { ErrorNotFound } from "../helpers/errors";
import { ISellerRequestService } from "./interfaces/sellerRequest";
import CreateSellerRequest from "../request/sellerRequest/createSellerRequest";
import SellerRequestEntity from "../entities/sellerRequest";
import { IProfileService } from "./interfaces/profile";
import { ISellerRequestRepository } from "../repositories/interfaces/sellerRequest";
import GetSellerRequest from "../request/sellerRequest/getSellerRequest";
import GetSellerRequestSpecification from "../repositories/specifications/sellerRequestSpecification";
import { IUserService } from "./interfaces/user";
import ProfileEntity from "../entities/profile";
import { UserRole } from "../entities/enums/enum";
import UserEntity from "../entities/user";
import { IBankService } from "./interfaces/bank";

@injectable()
class SellerRequestService implements ISellerRequestService {
    constructor(
        @inject(TYPES.SellerRequestRepository) private sellerRequestRepository: ISellerRequestRepository,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.UserService) private userService: IUserService,
        @inject(TYPES.BankService) private bankService: IBankService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher,
    ) { }
    async create(data: CreateSellerRequest, user: IUser): Promise<{ success: true }> {
        const searchUser = await this.profileService.findOne(user.uuid)
        if (!searchUser) throw new ErrorNotFound('User not found', '@Service Create Seller')
        const bank = await this.bankService.findOne(data.bank_uuid)
        const entity = new SellerRequestEntity({
            uuid: uuid(),
            card_holder_name: data.card_holder_name,
            card_number: data.card_number,
            created_by: {
                uuid: searchUser.created_by.uuid,
                name: searchUser.created_by.name,
                image: searchUser.image
            },
            phone: data.phone,
            email: searchUser.email,
            image: data.image,
            ktp_image: data.ktp_image,
            name: data.name,
            status: 'Pending',
            bank: bank.toJson(),
            deleted_at: null,
            created_at: new Date,
            updated_at: new Date,
        })
        return await this.sellerRequestRepository.create(entity)
    }

    async findOne(uuid: string): Promise<SellerRequestEntity | null> {

        const result = await this.sellerRequestRepository.findOne(uuid)

        return result ? new SellerRequestEntity(result) : null
    }



    async update(uuid: string, data: CreateSellerRequest, user: IUser): Promise<{ success: true }> {
        const searchSellerRequest = await this.sellerRequestRepository.findOne(uuid)
        if (!searchSellerRequest) throw new ErrorNotFound('Request not found ', '@Service update to seller')
        const searchUser = await this.profileService.findOne(searchSellerRequest?.created_by.uuid ?? '')
        if (!searchUser) throw new ErrorNotFound('User not found', '@service update to seller')
        const bank = await this.bankService.findOne(data.bank_uuid)
        if (!bank) throw new ErrorNotFound('Bank not found', '@Service update to seller')
        const entity = new SellerRequestEntity({
            uuid: searchSellerRequest?.uuid ?? '',
            card_holder_name: data.card_holder_name,
            card_number: data.card_number,
            phone: data.phone,
            created_by: {
                uuid: searchUser.created_by.uuid,
                name: searchUser.created_by.name,
                image: searchUser.image
            },
            email: searchUser.email,
            ktp_image: data.ktp_image,
            name: data.name,
            image: data.image,
            status: 'Pending',
            bank: bank,
            deleted_at: null,
            created_at: searchSellerRequest?.created_at ?? new Date,
            updated_at: searchSellerRequest?.updated_at ?? new Date,
        })
        const result = await this.sellerRequestRepository.update(entity)
        return { success: true }
    }

    async updateToSeller(uuid: string): Promise<{ success: true }> {
        const searchRequest = await this.sellerRequestRepository.findOne(uuid)
        // if (searchRequest?.status === 'Completed') throw new ErrorNotFound('Expired Data', '@Servoce change to seller ')
        if (!searchRequest) throw new ErrorNotFound('Data not found', '@Service Change member to seller')
        const searchProfile = await this.profileService.findOne(searchRequest.created_by.uuid ?? '')
        if (!searchProfile) throw new ErrorNotFound('Data not found', '@Service Change user to seller in Profile')
        const searchUser = await this.userService.findOne(searchRequest.created_by.uuid ?? '')
        if (!searchUser) throw new ErrorNotFound('Data not found', '@Service Change user to seller in user')

        const profileEntity = new ProfileEntity({
            uuid: searchProfile.uuid,
            card_number: searchRequest.card_number,
            province: searchProfile.province,
            city: searchProfile.city,
            district: searchProfile.district,
            village: searchProfile.village,
            cloudinary_id: searchProfile.cloudinary_id,
            email: searchProfile.email,
            created_by: searchProfile.created_by,
            image: searchProfile.image,
            phone: searchProfile.phone ?? searchRequest.phone,
            created_at: searchProfile.created_at,
            updated_at: searchProfile.updated_at,
            deleted_at: searchProfile.deleted_at,
            roles: [UserRole.MEMBER, UserRole.Seller],
            slug: searchProfile.slug,
            address: searchProfile.address,
            bank: searchRequest.bank
        })

        const userEntity = new UserEntity({
            uuid: searchUser.uuid,
            email: searchUser.email,
            name: searchUser.name,
            password: searchUser.password,
            roles: [UserRole.MEMBER, UserRole.Seller],
            is_active: searchUser.is_active,
            created_at: searchUser.created_at,
            updated_at: searchUser.updated_at,
            deleted_at: searchUser.deleted_at
        })

        await this.userService.updateForSeller(userEntity)
        await this.profileService.updateForSeller(profileEntity)
        searchRequest.status = 'Completed'
        await this.sellerRequestRepository.update(searchRequest)

        return { success: true }
    }

    async index(
        data: GetSellerRequest
    ): Promise<{
        total: number;
        data: SellerRequestEntity[];
    }> {
        return await this.sellerRequestRepository.index(
            new GetSellerRequestSpecification(data)
        );
    }

    async delete(uuid: string, user_uuid: string): Promise<{ success: true }> {
        await this.sellerRequestRepository.delete(uuid, user_uuid)

        return { success: true }
    }


}

export default SellerRequestService
