
import { inject, injectable } from "inversify";
import { IUser } from "../models/interfaces/user";
import { TYPES } from "../types";
import { EventDispatcher } from "event-dispatch";
import { v4 as uuid } from 'uuid'
import { ErrorBadRequest, ErrorNotFound } from "../helpers/errors";
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
import { IProvinceService } from "./interfaces/province";
import { ICityService } from "./interfaces/city";
import { IDistrictService } from "./interfaces/district";
import { IVillageSerivce } from "./interfaces/village";
import { cloudSellerRequest } from "../helpers/cloudinary";

@injectable()
class SellerRequestService implements ISellerRequestService {
    constructor(
        @inject(TYPES.SellerRequestRepository) private sellerRequestRepository: ISellerRequestRepository,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.UserService) private userService: IUserService,
        @inject(TYPES.BankService) private bankService: IBankService,
        @inject(TYPES.ProvinceService) private provinceService: IProvinceService,
        @inject(TYPES.CityService) private cityService: ICityService,
        @inject(TYPES.DistrictService) private districtService: IDistrictService,
        @inject(TYPES.VillageService) private villageService: IVillageSerivce,
    ) { }
    async create(data: CreateSellerRequest, user: IUser): Promise<{ success: true }> {
        const searchUser = await this.profileService.findOne(user.uuid)
        if (!searchUser) throw new ErrorNotFound('User tidak ditemukan', '@Service Create Seller')
        const sellerRequest = await this.sellerRequestRepository.findOneByUserUuid(searchUser.created_by.uuid ?? '')
        if (sellerRequest) throw new ErrorBadRequest('Kamu sudah pernah request sebagai seller', '@Service Create Request Seller')
        const province = await this.provinceService.findOne(data.province_uuid)
        if (!province) throw new ErrorNotFound('Province tidak ditemukan', '@Service Create Request Seller')
        const city = await this.cityService.findOne(data.city_uuid)
        if (!city) throw new ErrorNotFound('City tidak ditemukan', '@Service Create Request Seller')
        const district = await this.districtService.findOne(data.district_uuid)
        if (!district) throw new ErrorNotFound('District tidak ditemukan', '@Service Create Request Seller')
        const village = await this.villageService.findOne(data.village_uuid)
        if (!village) throw new ErrorNotFound('Village tidak ditemukan', '@Service Create Request Seller')
        if (village.district_uuid !== district.uuid && district.city_uuid !== city.uuid && city.province_uuid !== province.uuid)
            throw new ErrorNotFound('Apakah anda yakin daerah itu ada ?', '@Service Seller Request => Create')
        const bank = await this.bankService.findOne(data.bank_uuid)
        const entity = new SellerRequestEntity({
            uuid: uuid(),
            card_holder_name: "",
            card_number: "",
            created_by: {
                uuid: searchUser.created_by.uuid,
                name: searchUser.created_by.name,
                image: searchUser.image
            },
            address: data.address,
            phone: data.phone,
            email: searchUser.email,
            image: "",
            ktp_image: "",
            name: data.name,
            status: 'Pending',
            bank: bank,
            province: {
                uuid: province.uuid,
                name: province.name,
            },
            city: {
                uuid: city.uuid,
                name: city.name,
            },
            district: {
                uuid: district.uuid,
                name: district.name
            },
            village: {
                uuid: village.uuid,
                name: village.name,
            },
            deleted_at: null,
            created_at: new Date,
            updated_at: new Date,
        })
        const sellerEntity = await this.sellerRequestRepository.create(entity)
        this.uploadImage(sellerEntity.uuid, data.image, 'image')

        this.uploadImage(sellerEntity.uuid, data.ktp_image, 'ktp')

        return { success: true }

    }

    async findOne(uuid: string): Promise<SellerRequestEntity | null> {

        const result = await this.sellerRequestRepository.findOne(uuid)

        return result ? new SellerRequestEntity(result) : null
    }



    async update(uuid: string, data: CreateSellerRequest, user: IUser): Promise<{ success: true }> {
        const searchSellerRequest = await this.sellerRequestRepository.findOne(uuid)
        if (!searchSellerRequest) throw new ErrorNotFound('Request not found ', '@Service update to seller')
        const searchUser = await this.profileService.findOne(searchSellerRequest?.created_by.uuid ?? '')
        if (!searchUser || searchUser.created_by.uuid !== user.uuid) throw new ErrorNotFound('User not found', '@service update to seller')
        const bank = await this.bankService.findOne(data.bank_uuid)
        if (!bank) throw new ErrorNotFound('Bank not found', '@Service update to seller')
        const province = await this.provinceService.findOne(data.province_uuid)
        const city = await this.cityService.findOne(data.city_uuid)
        const district = await this.districtService.findOne(data.district_uuid)
        const village = await this.villageService.findOne(data.village_uuid)
        const entity = new SellerRequestEntity({
            uuid: searchSellerRequest?.uuid ?? '',
            card_holder_name: "",
            card_number: "",
            phone: data.phone,
            created_by: {
                uuid: searchUser.created_by.uuid,
                name: searchUser.created_by.name,
                image: searchUser.image
            },
            email: searchUser.email,
            ktp_image: data.ktp_image,
            name: data.name ?? searchSellerRequest.name,
            image: data.image,
            status: 'Pending',
            bank: bank,
            deleted_at: null,
            province: province,
            city: city,
            district: district,
            address: searchSellerRequest.address,
            village: village,
            created_at: searchSellerRequest?.created_at ?? new Date,
            updated_at: searchSellerRequest?.updated_at ?? new Date,
        })
        const result = await this.sellerRequestRepository.update(entity)
        return { success: true }
    }

    async updateToSeller(uuid: string): Promise<{ success: true }> {
        const searchRequest = await this.sellerRequestRepository.findOne(uuid)
        if (searchRequest?.status === 'Completed') throw new ErrorNotFound('Expired Data', '@Servoce change to seller ')
        if (!searchRequest) throw new ErrorNotFound('Data not found', '@Service Change member to seller')
        const searchProfile = await this.profileService.findOne(searchRequest.created_by.uuid ?? '')
        if (!searchProfile) throw new ErrorNotFound('Data not found', '@Service Change user to seller in Profile')
        const searchUser = await this.userService.findOne(searchRequest.created_by.uuid ?? '')
        if (!searchUser) throw new ErrorNotFound('Data not found', '@Service Change user to seller in user')

        const profileEntity = new ProfileEntity({
            uuid: searchProfile.uuid,
            card_number: searchRequest.card_number,
            province: searchRequest.province,
            city: searchRequest.city,
            district: searchRequest.district,
            village: searchRequest.village,
            cloudinary_id: searchProfile.cloudinary_id,
            email: searchProfile.email,
            created_by: searchProfile.created_by,
            image: searchProfile.image,
            phone: searchProfile.phone ?? searchRequest.phone,
            created_at: searchProfile.created_at,
            updated_at: searchProfile.updated_at,
            deleted_at: searchProfile.deleted_at,
            roles: [UserRole.MEMBER, UserRole.Seller],
            is_active: searchProfile.is_active,
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
            phone_number: searchUser.phone_number,
            is_active: searchUser.is_active,
            created_at: searchUser.created_at,
            updated_at: searchUser.updated_at,
            deleted_at: searchUser.deleted_at
        })

        await this.userService.updateForSeller(userEntity)
        await this.profileService.updateForSeller(profileEntity)
        searchRequest.status = 'Completed'
        searchRequest.deleted_at = new Date()
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

    async uploadImage(uuid: string, image: string, key: string): Promise<void> {
        const upload = await cloudSellerRequest(image)
        const menu = await this.findOne(uuid)
        if (!menu) throw new ErrorNotFound('Menu tidak ada', '@Service menu upload image')
        if (key == 'ktp') {
            menu.ktp_image = upload.secure_url
        } else if (key == 'image') {

            menu.image = upload.secure_url
        }


        await this.updateForImage(menu.uuid, menu)
    }

    async updateForImage(uuid: string, data: SellerRequestEntity): Promise<{ success: true }> {

        const sellerRequest = new SellerRequestEntity(data)
        await this.sellerRequestRepository.update(sellerRequest)
        return { success: true }
    }

    async findOneByUserUuid(user_uuid: string): Promise<SellerRequestEntity | null> {

        const sellerRequest = await this.sellerRequestRepository.findOneByUserUuid(user_uuid)
        return sellerRequest ? new SellerRequestEntity(sellerRequest) : null
    }

}

export default SellerRequestService
