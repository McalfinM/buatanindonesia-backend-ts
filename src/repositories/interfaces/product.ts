import ProductEntity from "../../entities/product";
import ProvinceEntity from "../../entities/province";
import specificationInterface from "../specifications/specificationInterface";

export interface IProductRepository {
    create(data: ProductEntity): Promise<{ success: true }>
    update(data: ProductEntity): Promise<{ success: true }>
    findOne(uuid: string): Promise<ProductEntity | null>
    findOneWithUser(uuid: string, user_uuid: string): Promise<ProductEntity | null>
    findOneBySlug(slug: string): Promise<ProductEntity | null>
    findAll(specification: specificationInterface): Promise<{ total: number, data: ProductEntity[] }>
    delete(uuid: string, user_uuid: string): Promise<{ success: true }>
    reduceStock(uuid: string, quantity: number): Promise<void>
}
