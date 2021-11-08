
import CartEntity from '../../entities/cart';
import { IUser } from '../../models/interfaces/user';
import specificationInterface from '../../repositories/specifications/specificationInterface';
import CreateCartRequest from '../../request/cart/cart';

export interface ICartService {
    createOrUpdate(data: CreateCartRequest, user: IUser): Promise<{ success: true }>
    findOne(uuid: string, user_uuid: string): Promise<CartEntity | null>
    findAll(user_uuid: string): Promise<CartEntity | null>
    delete(uuid: string, user_uuid: string): Promise<{ success: true }>
    minusQuantity(uuid: string, user_uuid: string): Promise<{ success: true }>
    findOneMyCart(user_uuid: string): Promise<CartEntity | null>
}
