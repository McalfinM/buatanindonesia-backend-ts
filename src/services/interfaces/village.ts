import VillageEntity from "../../entities/village";


export interface IVillageSerivce {
    findOne(uuid: string): Promise<VillageEntity>
    findAll(query: object): Promise<object>
}
