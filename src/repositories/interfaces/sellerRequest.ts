import ProfileEntity from "../../entities/profile";
import SellerRequestEntity from "../../entities/sellerRequest";
import CreateSellerRequest from "../../request/sellerRequest/createSellerRequest";
import specificationInterface from "../specifications/specificationInterface";


export interface ISellerRequestRepository {
    create(data: SellerRequestEntity): Promise<SellerRequestEntity>
    update(data: SellerRequestEntity): Promise<SellerRequestEntity>
    findOne(uuid: string): Promise<SellerRequestEntity | null>
    findOneByUserUuid(uuid: string): Promise<SellerRequestEntity | null>
    delete(uuid: string, user_uuid: string): Promise<{ success: true }>
    index(specification: specificationInterface): Promise<{ total: number, data: SellerRequestEntity[] }>
}
