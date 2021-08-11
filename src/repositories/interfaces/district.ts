import DistrictEntity from "../../entities/district";

export interface IDistrictRepository {
    // create(data: any): Promise<TokenEntity>
    // update(data: TokenEntity, user: string): Promise<TokenEntity>
    findOne(uuid: string): Promise<DistrictEntity | null>
    findAll(query: { [k: string]: any }): Promise<DistrictEntity[]>
}
