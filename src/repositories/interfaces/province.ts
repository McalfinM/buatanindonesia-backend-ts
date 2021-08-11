import ProvinceEntity from "../../entities/province";

export interface IProvinceRepository {
    // create(data: any): Promise<TokenEntity>
    // update(data: TokenEntity, user: string): Promise<TokenEntity>
    findOne(uuid: string): Promise<ProvinceEntity | null>
    findAll(query: { [k: string]: any }): Promise<ProvinceEntity[]>
}
