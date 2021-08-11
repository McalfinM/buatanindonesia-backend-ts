
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { EventDispatcher } from "event-dispatch";
import { IDistrictService } from "./interfaces/district";
import DistrictEntity from "../entities/district";
import { IDistrictRepository } from "../repositories/interfaces/district";

@injectable()
class DistrictService implements IDistrictService {
    constructor(@inject(TYPES.DistrictRepository) private districtRepository: IDistrictRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher) { }


    async findOne(uuid: string): Promise<DistrictEntity> {

        const provinceData: any = await this.districtRepository.findOne(uuid);

        return provinceData;
    }
    async findAll(query: object = {}): Promise<object> {

        const data = await this.districtRepository.findAll(query);

        return data;
    }
}

export default DistrictService
