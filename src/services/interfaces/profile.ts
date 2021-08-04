
import ProfileEntity from '../../entities/profile'
import UserEntity from '../../entities/user'
import { IUser } from '../../models/interfaces/user'
import GetProfileRequest from '../../request/profile/getProfileRequest'
import UpdateProfileRequest from '../../request/profile/updateProfileRequest'
import CreateUserRequest from '../../request/user/createUserRequest'

export interface IProfileService {
    create(data: ProfileEntity): Promise<{ success: true }>
    findOne(uuid: string): Promise<ProfileEntity | null>
    update(data: UpdateProfileRequest, user: IUser): Promise<{ success: true }>
    findOneBySlug(slug: string): Promise<{ data: ProfileEntity | null }>
    index(
        data: GetProfileRequest
    ): Promise<{
        total: number;
        data: ProfileEntity[];
    }>
    updateIsActiveTrue(user_uuid: string, is_active: boolean): Promise<{ success: true }>
}
