import ProvinceModel from "../models/province";
import { injectable } from "inversify";
import { IVillageRepository } from "./interfaces/village";
import VillageEntity from "../entities/village";
import VillageModel from "../models/village";

@injectable()
class VillageRepository implements IVillageRepository {
    // async create(provinceEntity: ProvinceEntity): Promise<IProvinces> {

    //     const document = {
    //         ...provinceEntity,

    //     } as IProvinces

    //     const createdDocument = {
    //         ...(await ProvinceModel.create(document)).toObject()
    //     } as IProvinces

    //     return document
    // }

    // async findById(uuid: string): Promise<IProvinces | null> {

    //     return await ProvinceModel.findOne({
    //         uuid: uuid
    //     });
    // }

    async findOne(uuid: string): Promise<VillageEntity | null> {
        const village = await VillageModel.findOne({ uuid: uuid })
        return village ? new VillageEntity(village) : null
    }

    // async update(provinceEntity: ProvinceEntity): Promise<IProvinces> {

    //     const filter = { uuid: provinceEntity.getUuid }
    //     const document = {
    //         uuid: provinceEntity.getUuid,
    //         code: provinceEntity.getCode,
    //         name: provinceEntity.getName,
    //         updated_at: new Date(),
    //     } as IProvinces

    //     await ProvinceModel.updateOne(filter, document)

    //     return document

    // }

    async findAll(query: { [k: string]: any }): Promise<VillageEntity[]> {

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

        return VillageModel.find(
            { ...queryVal },
            {},
            options
        )
            .then(result => {
                return result.map(data => {
                    return new VillageEntity({
                        uuid: data.uuid,
                        name: data.name,
                        code: data.code,
                        district_uuid: data.district_uuid,
                        postal_code: data.postal_code
                    });
                })
            })
            .catch(err => {
                return err;
            })
    }

}

export default VillageRepository;
