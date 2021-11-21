import ProfileEntity from "../../entities/profile";
import SellerRequestEntity from "../../entities/sellerRequest";
import { IUser } from "../../models/interfaces/user";
import GetSellerRequestSpecification from "../../repositories/specifications/sellerRequestSpecification";
import CreateSellerRequest from "../../request/sellerRequest/createSellerRequest";
import GetSellerRequest from "../../request/sellerRequest/getSellerRequest";


export interface ISellerRequestService {
    create(data: CreateSellerRequest, user: IUser): Promise<{ success: true }>
    update(uuid: string, data: CreateSellerRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<SellerRequestEntity | null>
    delete(uuid: string, user_uuid: string): Promise<{ success: true }>
    index(
        data: GetSellerRequest
    ): Promise<{
        total: number;
        data: SellerRequestEntity[];
    }>
    updateToSeller(uuid: string): Promise<{ success: true }>
    findOneByUserUuid(user_uuid: string): Promise<SellerRequestEntity | null>
}
