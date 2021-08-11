
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { EventDispatcher } from "event-dispatch";
import { IVillageSerivce } from "./interfaces/village";
import { IVillageRepository } from "../repositories/interfaces/village";
import VillageEntity from "../entities/village";

@injectable()
class VillageService implements IVillageSerivce {
    constructor(@inject(TYPES.VillageRepository) private villageRepository: IVillageRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher) { }


    async findOne(uuid: string): Promise<VillageEntity> {

        const provinceData: any = await this.villageRepository.findOne(uuid);

        return provinceData;
    }
    async findAll(query: object = {}): Promise<object> {

        const data = await this.villageRepository.findAll(query);

        return data;
    }
}

export default VillageService
