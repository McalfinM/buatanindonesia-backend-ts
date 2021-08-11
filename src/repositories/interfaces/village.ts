import VillageEntity from "../../entities/village";

export interface IVillageRepository {
    // create(data: any): Promise<TokenEntity>
    // update(data: TokenEntity, user: string): Promise<TokenEntity>
    findOne(uuid: string): Promise<VillageEntity | null>
    findAll(query: { [k: string]: any }): Promise<VillageEntity[]>
}
