import ProvinceEntity from "../entities/province";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { IProvinceRepository } from "../repositories/interfaces/province";
import { EventDispatcher } from "event-dispatch";
import { events } from "../events/events";
import { v4 as uuid } from 'uuid'
import { IProvinceService } from "./interfaces/province";

@injectable()
class ProvinceService implements IProvinceService {
    constructor(@inject(TYPES.ProvinceRepository) private provinceRepository: IProvinceRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher) { }


    async findOne(uuid: string): Promise<ProvinceEntity> {

        const provinceData: any = await this.provinceRepository.findOne(uuid);

        return provinceData;
    }
    async findAll(query: object = {}): Promise<object> {

        const data = await this.provinceRepository.findAll(query);

        return data;
    }
}

export default ProvinceService
