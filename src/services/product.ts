import ProvinceEntity from "../entities/province";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { EventDispatcher } from "event-dispatch";
import { v4 as uuidv4 } from 'uuid'
import { IProvinceService } from "./interfaces/province";
import CreateProductRequest from "../request/product/createProductRequest";
import { IUser } from "../models/interfaces/user";
import { IProductRepository } from "../repositories/interfaces/product";
import { ICategoryService } from "./interfaces/categories";
import ProductEntity from "../entities/product";
import slugify from "slugify";
import { IProfileService } from "./interfaces/profile";
import GetProductRequest from "../request/product/getProductRequest";
import GetProductSpecification from "../repositories/specifications/productSpecification";
import { IProductService } from "./interfaces/product";
import { ErrorNotFound } from "../helpers/errors";
import GetProductSpecificationWithAuth from "../repositories/specifications/productSpecWithAuth";

@injectable()
class ProductService implements IProductService {
    constructor(@inject(TYPES.ProductRepository) private productRepository: IProductRepository,
        @inject(TYPES.CategoryService) private categoryService: ICategoryService,
        @inject(TYPES.ProfileService) private profileService: IProfileService,
        @inject(TYPES.ProducerDispatcher) private dispatcher: EventDispatcher) { }

    async create(data: CreateProductRequest, user: IUser): Promise<{ success: true }> {

        const category = await this.categoryService.findOne(data.category_uuid)
        const profile = await this.profileService.findOne(user.uuid)
        const productEntity = new ProductEntity({
            uuid: uuidv4(),
            name: data.name,
            description: data.description,
            slug: slugify(data.name) + uuidv4(),
            image: data.image ?? 'https://res.cloudinary.com/dti2eqvdi/image/upload/v1627998960/profile/No_Image_Available_kvppd7.jpg',
            cloudinary_id: data.cloudinary_id ?? 'https://res.cloudinary.com/dti2eqvdi/image/upload/v1627998960/profile/No_Image_Available_kvppd7.jpg',
            price: data.price,
            stock: data.stock,
            created_by: {
                uuid: user.uuid,
                name: profile?.created_by.name,
                image: profile?.image
            },
            category: {
                uuid: category?.uuid,
                name: category?.name
            },
            is_active: false,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        })
        await this.productRepository.create(productEntity)

        return { success: true }
    }

    async findOne(uuid: string): Promise<ProductEntity | null> {

        const product = await this.productRepository.findOne(uuid);
        return product ? new ProductEntity(product) : null;
    }

    async findOneBySlug(slug: string): Promise<ProductEntity | null> {
        const result = await this.productRepository.findOneBySlug(slug)

        return result ? new ProductEntity(result) : null
    }
    async delete(uuid: string, user_uuid: string): Promise<{ success: true }> {
        const result = await this.productRepository.delete(uuid, user_uuid)

        return { success: true }
    }
    async update(uuid: string, data: CreateProductRequest, user: IUser): Promise<{ success: true }> {
        const product = await this.productRepository.findOneWithUser(uuid, user.uuid)
        if (!product) throw new ErrorNotFound('Product not found', '@ Service Product update')
        const category = await this.categoryService.findOne(data.category_uuid)
        if (!category) throw new ErrorNotFound('Category not found', '@ Service Product update')
        const profile = await this.profileService.findOne(user.uuid)
        if (!profile) throw new ErrorNotFound('User not found', '@ Service product update')
        let slugi = ''
        if (product.name !== data.name) {
            slugi = slugify(data.name) + uuidv4()
        } else {
            slugi = product.slug
        }
        const productEntity = new ProductEntity({
            uuid: product.uuid,
            name: data.name,
            description: data.description,
            slug: slugi,
            image: data.image ?? product.image,
            cloudinary_id: data.cloudinary_id ?? product.cloudinary_id,
            price: data.price,
            stock: data.stock,
            created_by: {
                uuid: user.uuid,
                name: profile?.created_by.name,
                image: profile?.image
            },
            category: {
                uuid: category?.uuid,
                name: category?.name
            },
            is_active: product.is_active,
            created_at: product.created_at,
            updated_at: new Date,
            deleted_at: null
        })
        await this.productRepository.update(productEntity)
        return { success: true }
    }
    async findAll(
        data: GetProductRequest
    ): Promise<{
        total: number;
        data: ProductEntity[];
    }> {
        return await this.productRepository.findAll(
            new GetProductSpecification(data)
        );
    }

    async findAllWithUser(
        data: GetProductRequest
    ): Promise<{
        total: number;
        data: ProductEntity[];
    }> {
        return await this.productRepository.findAll(
            new GetProductSpecificationWithAuth(data)
        );
    }
}

export default ProductService
