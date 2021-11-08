import CartEntity from "../../entities/cart";
import specificationInterface from "../specifications/specificationInterface";

export interface ICartRepository {
    create(data: CartEntity): Promise<{ success: true }>
    update(data: CartEntity): Promise<{ success: true }>
    findOne(uuid: string, user_uuid: string): Promise<CartEntity | null>
    findOneMyCart(user_uuid: string): Promise<CartEntity | null>
    findAll(user_uuid: string): Promise<CartEntity | null>
    delete(uuid: string, user_uuid: string): Promise<{ success: true }>
}
