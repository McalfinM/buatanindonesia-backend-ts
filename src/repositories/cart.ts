
import { injectable } from "inversify";
import CartEntity from "../entities/cart";
import CartModel from "../models/cart";
import { ICartRepository } from "./interfaces/cart";
import specificationInterface from "./specifications/specificationInterface";


@injectable()
class CartRepository implements ICartRepository {


    async create(data: CartEntity): Promise<{ success: true }> {

        await CartModel.create({
            uuid: data.uuid,
            quantity: data.quantity,
            product: data.product,
            created_by: data.created_by,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at
        })

        return { success: true }
    }

    async findOne(uuid: string, user_uuid: string): Promise<CartEntity | null> {
        const result = await CartModel.findOne({ uuid: uuid, "created_by.uuid": user_uuid })

        return result ? new CartEntity(result) : null
    }

    // async findOneMyProduct(user_uuid:string,product_uuid: string): Promise<CartEntity | null> {
    //     const result = await CartModel.findOne({ "created_by.uuid": user_uuid,  })

    //     return result ? new CartEntity(result) : null
    // }

    async findOneMyCart(user_uuid: string): Promise<CartEntity | null> {
        const result = await CartModel.findOne({ "created_by.uuid": user_uuid })

        return result ? new CartEntity(result) : null
    }

    async delete(uuid: string, user_uuid: string): Promise<{ success: true }> {

        const deleteCart = await CartModel.updateOne({ "created_by.uuid": user_uuid, "product.uuid": uuid },
            { $pull: { product: { uuid: uuid } } },
            {
                upsert: false,
                multi: true
            }

        )
        return { success: true }
    }
    async update(data: CartEntity): Promise<{ success: true }> {

        await CartModel.updateOne({ uuid: data.uuid }, {
            ...data.toJson()
        })

        return { success: true }
    }


    async findAll(user_uuid: string): Promise<CartEntity | null> {
        const cart = await CartModel.findOne({ "created_by.uuid": user_uuid })

        return cart ? new CartEntity(cart) : null
    }

}

export default CartRepository;
