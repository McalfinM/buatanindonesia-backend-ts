
import ProductEntity from '../../entities/product';
import { IUser } from '../../models/interfaces/user';
import CreateProductRequest from '../../request/product/createProductRequest';
import GetProductRequest from '../../request/product/getProductRequest';

export interface IProductService {
    create(data: CreateProductRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string): Promise<ProductEntity | null>
    update(uuid: string, data: CreateProductRequest, user: IUser): Promise<{ success: true }>
    findOneBySlug(slug: string): Promise<ProductEntity | null>
    delete(uuid: string, user_uuid: string): Promise<{ success: true }>
    findAll(
        data: GetProductRequest,
    ): Promise<{
        total: number;
        data: ProductEntity[];
    }>
    findAllWithUser(
        data: GetProductRequest,
    ): Promise<{
        total: number;
        data: ProductEntity[];
    }>
}
