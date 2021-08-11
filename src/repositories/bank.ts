import { injectable } from "inversify";
import { IBankRepository } from "./interfaces/bank";
import BankEntity from "../entities/bank";
import BankModel from "../models/bank";

@injectable()
class BankRepository implements IBankRepository {
    // async create(provinceEntity: BankEntity): Promise<IProvinces> {

    //     const document = {
    //         ...provinceEntity,

    //     } as IProvinces

    //     const createdDocument = {
    //         ...(await BankModel.create(document)).toObject()
    //     } as IProvinces

    //     return document
    // }

    // async findById(uuid: string): Promise<IProvinces | null> {

    //     return await BankModel.findOne({
    //         uuid: uuid
    //     });
    // }

    async findOne(uuid: string): Promise<BankEntity | null> {
        const province = await BankModel.findOne({ uuid: uuid })
        return province ? new BankEntity(province) : null
    }

    // async update(provinceEntity: BankEntity): Promise<IProvinces> {

    //     const filter = { uuid: provinceEntity.getUuid }
    //     const document = {
    //         uuid: provinceEntity.getUuid,
    //         code: provinceEntity.getCode,
    //         name: provinceEntity.getName,
    //         updated_at: new Date(),
    //     } as IProvinces

    //     await BankModel.updateOne(filter, document)

    //     return document

    // }

    async findAll(query: { [k: string]: any }): Promise<BankEntity[]> {

        const { page, limit, sort, ...rest } = query;

        // filter
        const queryVal: { [k: string]: any } = {}
        for (const key in rest) {
            if (Object.prototype.hasOwnProperty.call(rest, key)) {
                const element: any = rest[key];
                if (typeof element === 'object') {
                    for (const k in element) {
                        if (Object.prototype.hasOwnProperty.call(element, k)) {
                            queryVal[key] = { ['$' + k]: element[k] };
                        }
                    }
                }
                else {
                    queryVal[key] = new RegExp(rest[key], 'i');
                }
            }
        }

        // sort
        const sortVal: { [k: string]: any } = {}
        const sortArr = (sort as string)?.split(',');
        sortArr?.map(s => {
            const splitted = (s as string)?.split('.');
            sortVal[splitted[0]] = splitted[1].toUpperCase() == 'ASC' ? 1 : -1;
        })

        let options: object = {} as any;
        // paginate
        if (limit) {
            // @ts-ignore
            options.limit = +limit;
        }

        if (page && limit) {
            if (+page > 1) {
                // @ts-ignore
                options.skip = (p + age - 1) * +limit;
            }
        }

        // @ts-ignore
        options.sort = sortVal;

        return BankModel.find(
            { ...queryVal },
            {},
            options
        )
            .then(result => {
                return result.map(data => {
                    return new BankEntity({
                        uuid: data.uuid,
                        name: data.name,
                        code: data.code,

                    });
                })
            })
            .catch(err => {
                return err;
            })
    }

}

export default BankRepository;
