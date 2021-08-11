
import CityEntity from '../../entities/city';
import ProvinceEntity from '../../entities/province'

export interface ICityService {
    findOne(uuid: string): Promise<CityEntity>
    findAll(query: object): Promise<object>
}
