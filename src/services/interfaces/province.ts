
import ProvinceEntity from '../../entities/province'

export interface IProvinceService {
    findOne(uuid: string): Promise<ProvinceEntity>
    findAll(query: object): Promise<object>
}
