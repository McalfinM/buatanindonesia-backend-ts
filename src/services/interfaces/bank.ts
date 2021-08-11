import BankEntity from "../../entities/bank";



export interface IBankService {
    findOne(uuid: string): Promise<BankEntity>
    findAll(query: object): Promise<object>
}
