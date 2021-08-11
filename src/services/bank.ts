
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { EventDispatcher } from "event-dispatch";
import { IBankService } from "./interfaces/bank";
import BankEntity from "../entities/bank";
import { IBankRepository } from "../repositories/interfaces/bank";

@injectable()
class BankService implements IBankService {
    constructor(@inject(TYPES.BankRepository) private bankRepository: IBankRepository,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher) { }


    async findOne(uuid: string): Promise<BankEntity> {

        const provinceData: any = await this.bankRepository.findOne(uuid);

        return provinceData;
    }
    async findAll(query: object = {}): Promise<object> {

        const data = await this.bankRepository.findAll(query);

        return data;
    }
}

export default BankService
