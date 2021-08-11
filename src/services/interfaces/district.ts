
import CityEntity from '../../entities/city';
import DistrictEntity from '../../entities/district';
import ProvinceEntity from '../../entities/province'

export interface IDistrictService {
    findOne(uuid: string): Promise<DistrictEntity>
    findAll(query: object): Promise<object>
}
