"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../types");
const uuid_1 = require("uuid");
const product_1 = __importDefault(require("../entities/product"));
const slugify_1 = __importDefault(require("slugify"));
const productSpecification_1 = __importDefault(require("../repositories/specifications/productSpecification"));
const errors_1 = require("../helpers/errors");
const productSpecWithAuth_1 = __importDefault(require("../repositories/specifications/productSpecWithAuth"));
const cloudinary_1 = require("../helpers/cloudinary");
let ProductService = class ProductService {
    productRepository;
    categoryService;
    profileService;
    dispatcher;
    constructor(productRepository, categoryService, profileService, dispatcher) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.profileService = profileService;
        this.dispatcher = dispatcher;
    }
    async create(data, user) {
        const category = await this.categoryService.findOne(data.category_uuid);
        if (!category)
            throw new errors_1.ErrorNotFound('Kategori tidak ada', '@Service Create Product');
        const profile = await this.profileService.findOne(user.uuid);
        if (!profile)
            throw new errors_1.ErrorNotFound('User tidak ada', '@Service Create Product');
        const productEntity = new product_1.default({
            uuid: (0, uuid_1.v4)(),
            name: data.name,
            description: data.description,
            slug: (0, slugify_1.default)(data.name) + (0, uuid_1.v4)(),
            image: 'https://res.cloudinary.com/dti2eqvdi/image/upload/v1627998960/profile/No_Image_Available_kvppd7.jpg',
            cloudinary_id: data.cloudinary_id ?? '',
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
            city: {
                uuid: profile?.city.uuid,
                name: profile?.city.name
            },
            is_active: false,
            created_at: new Date,
            updated_at: new Date,
            deleted_at: null
        });
        await this.productRepository.create(productEntity);
        this.uploadImage(productEntity.uuid, data.image, 'image');
        return { success: true };
    }
    async findOne(uuid) {
        const product = await this.productRepository.findOne(uuid);
        return product ? new product_1.default(product) : null;
    }
    async findOneBySlug(slug) {
        const result = await this.productRepository.findOneBySlug(slug);
        return result ? new product_1.default(result) : null;
    }
    async delete(uuid, user_uuid) {
        const result = await this.productRepository.delete(uuid, user_uuid);
        if (!result)
            throw new errors_1.ErrorNotFound('Produk tidak ada', '@Service Prodct => delete');
        return { success: true };
    }
    async update(uuid, data, user) {
        const product = await this.productRepository.findOneWithUser(uuid, user.uuid);
        if (!product)
            throw new errors_1.ErrorNotFound('Product not found', '@ Service Product update');
        const category = await this.categoryService.findOne(data.category_uuid);
        if (!category)
            throw new errors_1.ErrorNotFound('Category not found', '@ Service Product update');
        const profile = await this.profileService.findOne(user.uuid);
        if (!profile)
            throw new errors_1.ErrorNotFound('User not found', '@ Service product update');
        let slugi = '';
        if (product.name !== data.name) {
            slugi = (0, slugify_1.default)(data.name) + (0, uuid_1.v4)();
        }
        else {
            slugi = product.slug;
        }
        const productEntity = new product_1.default({
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
            city: {
                uuid: profile?.city.uuid,
                name: profile?.city.name
            },
            is_active: product.is_active,
            created_at: product.created_at,
            updated_at: new Date,
            deleted_at: null
        });
        await this.productRepository.update(productEntity);
        return { success: true };
    }
    async findAll(data) {
        return await this.productRepository.findAll(new productSpecification_1.default(data));
    }
    async findAllWithUser(data) {
        return await this.productRepository.findAll(new productSpecWithAuth_1.default(data));
    }
    async reduceStock(uuid, quantity) {
    }
    async uploadImage(uuid, image, key) {
        const upload = await (0, cloudinary_1.cloudSellerRequest)(image);
        const menu = await this.productRepository.findOne(uuid);
        if (!menu)
            throw new errors_1.ErrorNotFound('Produk tidak di temukan', '@Service Product => uploadImage');
        menu.image = upload.secure_url;
        menu.cloudinary_id = upload.cloudinary_id;
        await this.updateForImage(menu.uuid, menu);
    }
    async updateForImage(uuid, data) {
        const sellerRequest = new product_1.default(data);
        await this.productRepository.update(sellerRequest);
        return { success: true };
    }
};
ProductService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ProductRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.CategoryService)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.ProfileService)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.ProducerDispatcher))
], ProductService);
exports.default = ProductService;
