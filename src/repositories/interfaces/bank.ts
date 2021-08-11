import BankEntity from "../../entities/bank";

export interface IBankRepository {
    // create(data: any): Promise<TokenEntity>
    // update(data: TokenEntity, user: string): Promise<TokenEntity>
    findOne(uuid: string): Promise<BankEntity | null>
    findAll(query: { [k: string]: any }): Promise<BankEntity[]>
}
