
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { EventDispatcher } from "event-dispatch";
import { ICityService } from "./interfaces/city";
import { ICityRepository } from "../repositories/interfaces/city";
import CityEntity from "../entities/city";

@injectable()
class CityService implements ICityService {
    constructor(@inject(TYPES.CityRepository) private cityRepository: ICityRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher) { }


    async findOne(uuid: string): Promise<CityEntity> {

        const provinceData: any = await this.cityRepository.findOne(uuid);

        return provinceData;
    }
    async findAll(query: object = {}): Promise<object> {

        const data = await this.cityRepository.findAll(query);

        return data;
    }
}

export default CityService
