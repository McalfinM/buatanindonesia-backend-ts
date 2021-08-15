
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { EventDispatcher } from "event-dispatch";
import { ICartService } from "./interfaces/cart";
import CreateCartRequest from "../request/cart/cart";
import { ICartRepository } from "../repositories/interfaces/cart";
import { IUser } from "../models/interfaces/user";
import { IProductService } from "./interfaces/product";
import CartEntity from "../entities/cart";
import { v4 as uuidV4 } from 'uuid'
import { IProfileService } from "./interfaces/profile";
import { IProduct } from "../entities/interfaces/cart";
import { ErrorNotFound } from "../helpers/errors";

@injectable()
class CartService implements ICartService {
    constructor(@inject(TYPES.CartRepository) private cartRepository: ICartRepository,
        @inject(TYPES.ProductService) private productService: IProductService,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher) { }


    async createOrUpdate(data: CreateCartRequest, user: IUser): Promise<{ success: true }> {
        const searchCart = await this.cartRepository.findOneMyCart(user.uuid)
        const searchUser = await this.profileService.findOne(user.uuid)
        let product: IProduct[] = []

        if (!searchCart) {
            const searchProduct = await this.productService.findOne(data.product_uuid)
            if (!searchProduct) throw new ErrorNotFound('Product not found', '@Service create or update cart')
            product.push({
                uuid: uuidV4(),
                name: searchProduct?.name ?? '',
                image: searchProduct?.image ?? '',
                price: searchProduct?.price ?? 0,
                product_uuid: searchProduct?.uuid ?? '',
                seller_by: searchProduct?.created_by ?? {},
                slug: searchProduct?.slug ?? '',
                stock: searchProduct?.stock ?? 0,
                quantity: 1
            })

            let entityCart = new CartEntity({
                uuid: uuidV4(),
                created_by: {
                    uuid: searchUser?.created_by.uuid,
                    name: searchUser?.created_by.name,
                    image: searchUser?.image
                },
                product: product,
                deleted_at: null,
                quantity: product.length,
                updated_at: new Date(),
                created_at: new Date()
            })
            await this.cartRepository.create(entityCart);
        } else {
            const searchProduct = await this.productService.findOne(data.product_uuid)
            if (!searchProduct) throw new ErrorNotFound('Product not found', '@Service create or update cart')
            for (let i = 0; i < searchCart.product.length; i++) {

                if (searchCart.product[i].product_uuid === data.product_uuid) {

                    await this.cartRepository.delete(searchCart.product[i].uuid ?? '', user.uuid)
                    searchCart.product[i].quantity += 1

                    return await this.cartRepository.update(searchCart);

                }
            }

            product.push({
                uuid: uuidV4(),
                name: searchProduct?.name ?? '',
                image: searchProduct?.image ?? '',
                price: searchProduct?.price ?? 0,
                product_uuid: searchProduct?.uuid ?? '',
                seller_by: searchProduct?.created_by ?? {},
                slug: searchProduct?.slug ?? '',
                stock: searchProduct?.stock ?? 0,
                quantity: 1
            })
            let concat = searchCart.product.concat(product)

            let entityCart = new CartEntity({
                uuid: searchCart.uuid,
                created_by: {
                    uuid: searchUser?.created_by.uuid,
                    name: searchUser?.created_by.name,
                    image: searchUser?.image
                },
                product: concat,
                deleted_at: null,
                quantity: product.length,
                updated_at: new Date(),
                created_at: new Date()
            })
            await this.cartRepository.update(entityCart);

        }


        return { success: true };
    }

    async delete(uuid: string, user_uuid: string): Promise<{ success: true }> {
        await this.cartRepository.delete(uuid, user_uuid)

        return { success: true }
    }

    async findOne(uuid: string, user_uuid: string): Promise<CartEntity | null> {
        const result = await this.cartRepository.findOne(uuid, user_uuid)

        return result ? new CartEntity(result) : null
    }


    async findAll(user_uuid: string): Promise<CartEntity[]> {
        return await this.cartRepository.findAll(user_uuid)
    }

}

export default CartService
