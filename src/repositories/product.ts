
import { injectable } from "inversify";
import ProductEntity from "../entities/product";
import ProductModel from "../models/product";
import { IProductRepository } from "./interfaces/product";
import specificationInterface from "./specifications/specificationInterface";


@injectable()
class ProductRepository implements IProductRepository {
    async create(data: ProductEntity): Promise<{ success: true }> {
        const result = await ProductModel.create({
            uuid: data.uuid,
            created_by: data.created_by,
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            stock: data.stock,
            image: data.image,
            category: data.category,
            cloudinary_id: data.cloudinary_id,
            is_active: data.is_active,
            created_at: data.created_at,
            updated_at: data.updated_at,
            deleted_at: data.deleted_at,

        })

        return { success: true }
    }
    async update(data: ProductEntity): Promise<{ success: true }> {
        const result = await ProductModel.updateOne({ uuid: data.uuid, deleted_at: null }, {
            ...data.toJson()
        })

        return { success: true }
    }
    async findOne(uuid: string): Promise<ProductEntity | null> {
        const result = await ProductModel.findOne({ uuid: uuid, deleted_at: null })

        return result ? new ProductEntity(result) : null
    }
    async findOneWithUser(uuid: string, user_uuid: string): Promise<ProductEntity | null> {
        const result = await ProductModel.findOne({ uuid: uuid, "created_by.uuid": user_uuid, deleted_at: null })

        return result ? new ProductEntity(result) : null
    }

    async findOneBySlug(slug: string): Promise<ProductEntity | null> {
        const result = await ProductModel.findOne({ slug: slug, deleted_at: null })

        return result ? new ProductEntity(result) : null
    }

    async delete(uuid: string, user_uuid: string): Promise<{ success: true }> {
        const result = await ProductModel.updateOne({ uuid: uuid, "created.by": user_uuid }, {
            deleted_at: new Date
        })

        return { success: true }
    }

    async findAll(
        specification: specificationInterface
    ): Promise<{
        total: number;
        data: ProductEntity[];
    }> {
        const total_customer = await ProductModel.find({

            ...specification.specifies(),
        }).countDocuments();
        return ProductModel.find(
            {
                ...specification.specifies(),
            },
            {},
            {
                ...specification.paginate(),
                sort: specification.specSort(),
            }
        )
            .then((result) => {
                return {
                    total: total_customer,
                    data: result.map((data) => {
                        return new ProductEntity({
                            ...data.toJSON()
                        });
                    }),
                };
            })
            .catch((err) => {
                return err;
            });
    }


}

export default ProductRepository;
