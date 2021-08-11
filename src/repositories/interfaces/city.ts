import CityEntity from "../../entities/city";

export interface ICityRepository {
    // create(data: any): Promise<TokenEntity>
    // update(data: TokenEntity, user: string): Promise<TokenEntity>
    findOne(uuid: string): Promise<CityEntity | null>
    findAll(query: { [k: string]: any }): Promise<CityEntity[]>
}
