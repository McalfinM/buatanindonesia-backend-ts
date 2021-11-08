import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { v4 as uuidv4 } from 'uuid'
import { events } from "../events/events";
import { EventDispatcher } from "event-dispatch";
import ProfileEntity from "../entities/profile";
import { IProfileRepository } from "../repositories/interfaces/profile";
import GetProfileRequest from "../request/profile/getProfileRequest";
import GetProfileSpecification from "../repositories/specifications/profileSpecification"
import slugify from "slugify";
import { IUser } from "../models/interfaces/user";
import UpdateProfileRequest from "../request/profile/updateProfileRequest";
import { ErrorNotFound } from "../helpers/errors";
import { cloud } from "../helpers/cloudinary";
import { ICommentService } from "./interfaces/comment";
import { IUserService } from "./interfaces/user";
import { IUserRepository } from "../repositories/interfaces/user";
import { UserRole } from "../entities/enums/enum";
import { IProfileService } from "./interfaces/profile";
import { IProvinceService } from "./interfaces/province";
import { ICityService } from "./interfaces/city";
import { IDistrictService } from "./interfaces/district";
import { IVillageSerivce } from "./interfaces/village";
import CommentEntity from "../entities/comment";
import { IBankService } from "./interfaces/bank";

@injectable()
class ProfileService implements IProfileService {

    constructor(

        @inject(TYPES.ProfileRepository) private profileReopsitory: IProfileRepository,
        @inject(TYPES.CommentService) private commentService: ICommentService,
        @inject(TYPES.ProvinceService) private provinceService: IProvinceService,
        @inject(TYPES.CityService) private cityService: ICityService,
        @inject(TYPES.DistrictService) private districtService: IDistrictService,
        @inject(TYPES.VillageService) private villageService: IVillageSerivce,
        @inject(TYPES.BankService) private bankService: IBankService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher
    ) { }

    async create(data: ProfileEntity): Promise<{ success: true }> {
        const profileEntity = new ProfileEntity({
            uuid: data.uuid,
            created_by: {
                uuid: data.created_by.uuid ?? '',
                name: data.created_by.name ?? '',
            },
            slug: slugify(data.created_by.name ?? '', {
                replacement: '-',
                strict: true
            }) + uuidv4(),
            roles: [UserRole.MEMBER],
            address: '',
            card_number: '',
            city: data.city,
            district: data.city,
            email: data.email ?? '',
            image: data.image,
            village: data.village,
            phone: data.phone,
            cloudinary_id: data.cloudinary_id,
            created_at: data.created_at,
            province: data.province,
            bank: data.bank,
            is_active: false,
            updated_at: data.updated_at,
            deleted_at: null
        })
        await this.profileReopsitory.create(profileEntity)
        return { success: true }
    }

    async findOne(uuid: string): Promise<ProfileEntity | null> {
        const result = await this.profileReopsitory.findOne(uuid)

        return result
    }

    async update(data: UpdateProfileRequest, user: IUser): Promise<{ success: true }> {
        const searchProfile = await this.profileReopsitory.findOne(user.uuid)
        const province = await this.provinceService.findOne(data.province_uuid)
        const city = await this.cityService.findOne(data.city_uuid)
        const district = await this.districtService.findOne(data.district_uuid)
        const village = await this.villageService.findOne(data.village_uuid)
        const commentService = await this.commentService.findOne(user.uuid)
        const bank = data.bank_uuid ? await this.bankService.findOne(data.bank_uuid) : null
        if (!searchProfile) throw new ErrorNotFound('Data not found', '@Service Update profile')
        let slugi = ''
        if (searchProfile.created_by.name !== data.name) {
            slugi = slugify(data.name ?? '', {
                replacement: '-',
                strict: true,
            }) + uuidv4()
        } else {
            slugi = searchProfile.slug
        }

        if (searchProfile.cloudinary_id !== data.cloudinary_id) {
            await cloud.uploader.destroy('profile/' + searchProfile.cloudinary_id)
        }
        const profileEntity = new ProfileEntity({
            uuid: searchProfile.uuid,
            created_by: {
                uuid: searchProfile.uuid,
                name: data.name ?? '',
            },
            slug: slugi,
            roles: [UserRole.MEMBER],
            address: data.address,
            card_number: data.card_number,
            city: city ?? {},
            district: district ?? {},
            province: province ?? {},
            village: village ?? {},
            email: data.email ?? '',
            image: data.image,
            phone: data.phone,
            cloudinary_id: data.cloudinary_id,
            bank: {
                uuid: bank?.uuid ?? '',
                name: bank?.name ?? ''
            },
            is_active: searchProfile.is_active,
            created_at: searchProfile.created_at,
            updated_at: new Date,
            deleted_at: null
        })
        // if (postService.data.length > 0) {
        //     if (postService.data[0].created_by.name !== data.nickname || postService.data[0].created_by.image !== data.image) {
        //         await this.postService.chainUpdateFromProfile(profileEntity)
        //     }

        // }

        if (commentService) {
            if (commentService.created_by.name !== data.name || commentService.created_by.image !== data.image) {
                await this.commentService.chainUpdateFromProfile(profileEntity)
            }
        }

        // if (userService) {

        //     if (userService.name !== data.nickname) {
        //         await this.userService.chainUpdateFromProfile(data.nickname ?? '', user.uuid)
        //     }
        // }



        await this.profileReopsitory.update(profileEntity)

        return { success: true }
    }

    async findOneBySlug(slug: string): Promise<{ data: ProfileEntity | null, comment: CommentEntity[], likes: string[] }> {
        const result = await this.profileReopsitory.findOneBySlug(slug)
        const likes = await this.commentService.find(result?.uuid ?? '')
        const commentEntity = await this.commentService.find(result?.uuid ?? '')
        let stringLikes: string[] = []
        for (let i = 0; i < likes.data.length; i++) {
            stringLikes.push(likes.data[i].created_by.uuid ?? '')
        }
        return {
            data: result,
            likes: stringLikes,
            comment: commentEntity.data,
        }
    }

    async index(
        data: GetProfileRequest
    ): Promise<{
        total: number;
        data: ProfileEntity[];
    }> {
        return await this.profileReopsitory.index(
            new GetProfileSpecification(data)
        );
    }

    async updateIsActiveTrue(user_uuid: string, is_active: boolean): Promise<{ success: true }> {
        await this.profileReopsitory.updateIsActiveTrue(user_uuid, is_active)
        return { success: true }
    }

    async updateForSeller(data: ProfileEntity): Promise<{ success: true }> {
        await this.profileReopsitory.update(data)

        return { success: true }
    }

    async findMyProfile(user: IUser): Promise<{ success: true }> {
        await this.profileReopsitory.findOne(user.uuid)
        return { success: true }

    }

}

export default ProfileService
