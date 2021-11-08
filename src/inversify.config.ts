
import IndexRouter from "./api/routes";
import IRouter from "./api/routes/interfaces/router";
import { IConnector } from "./events/connectors/IConnector";
import KafkaConnector from "./events/connectors/kafka";
import { ConsumerDispatcher } from "./events/consumers/dispatcher";
import { ProducerDispatcher } from "./events/producers/dispatcher";
import Subscribers from "./events/subscribers";
import { TYPES } from "./types";
import { EventDispatcher } from "event-dispatch";
import { Container, decorate, injectable } from "inversify";
import BaseRouter from "./api/routes/baseRouter";
import { ISeeder } from "./seeds/interfaces/seeder"
import { SEEDER_TYPES } from "./seeds/seeder.types";
import { ITokenService } from "./services/interfaces/token";
import TokenService from "./services/token";
import { ITokenRepository } from "./repositories/interfaces/token";
import TokenRepository from "./repositories/token";
import { IEmailService } from "./services/interfaces/email";
import EmailService from "./services/email";
import TokenRouter from "./api/routes/token";
import { ITokenController } from "./api/controllers/interfaces/token";
import TokenController from "./api/controllers/token";
import AuthRouter from "./api/routes/auth";
import { IAuthController } from "./api/controllers/interfaces/auth";
import AuthController from "./api/controllers/auth";
import UserRouter from "./api/routes/user";
import { IUserController } from "./api/controllers/interfaces/user";
import UserController from "./api/controllers/user";
import { IUserService } from "./services/interfaces/user";
import UserService from "./services/user";
import { IUserRepository } from "./repositories/interfaces/user";
import UserRepository from "./repositories/user";
import { IVillageController } from "./api/controllers/interfaces/village";
import { IVillageSerivce } from "./services/interfaces/village";
import { IVillageRepository } from "./repositories/interfaces/village";
import VillageController from "./api/controllers/village";
import VillageRouter from "./api/routes/village";
import VillageRepository from "./repositories/village";
import VillageService from "./services/village";
import ProvinceRouter from "./api/routes/province";
import { IProvinceController } from "./api/controllers/interfaces/province";
import { IProvinceService } from "./services/interfaces/province";
import ProvinceService from "./services/province";
import { IProvinceRepository } from "./repositories/interfaces/province";
import ProvinceRepository from "./repositories/province";
import ProvinceController from "./api/controllers/province";
import CityRouter from "./api/routes/city";
import { ICityController } from "./api/controllers/interfaces/city";
import { ICityService } from "./services/interfaces/city";
import { ICityRepository } from "./repositories/interfaces/city";
import CityController from "./api/controllers/city";
import CityRepository from "./repositories/city";
import CityService from "./services/city";
import { IDistrictController } from "./api/controllers/interfaces/district";
import { IDistrictService } from "./services/interfaces/district";
import { IDistrictRepository } from "./repositories/interfaces/district";
import DistrictController from "./api/controllers/district";
import DistrictRouter from "./api/routes/district";
import DistrictRepository from "./repositories/district";
import DistrictService from "./services/district";
import { IProfileService } from "./services/interfaces/profile";
import ProfileService from "./services/profile";
import { IProfileRepository } from "./repositories/interfaces/profile";
import ProfileRepository from "./repositories/profile";
import { ICommentService } from "./services/interfaces/comment";
import CommentService from "./services/comment";
import { ICommentRepository } from "./repositories/interfaces/comment";
import CommentRepository from "./repositories/comment";
import SellerRequestRouter from "./api/routes/sellerRequest";
import { ISellerRequestController } from "./api/controllers/interfaces/sellerRequest";
import { ISellerRequestService } from "./services/interfaces/sellerRequest";
import { ISellerRequestRepository } from "./repositories/interfaces/sellerRequest";
import SellerRequestController from "./api/controllers/sellerRequest";
import SellerRequestRepository from "./repositories/sellerRequest";
import SellerRequestService from "./services/sellerRequest";
import { IBankController } from "./api/controllers/interfaces/bank";
import { IBankService } from "./services/interfaces/bank";
import { IBankRepository } from "./repositories/interfaces/bank";
import BankRouter from "./api/routes/bank";
import BankController from "./api/controllers/bank";
import BankRepository from "./repositories/bank";
import BankService from "./services/bank";
import ProductRouter from "./api/routes/product";
import { IProductController } from "./api/controllers/interfaces/product";
import { IProductService } from "./services/interfaces/product";
import { IProductRepository } from "./repositories/interfaces/product";
import ProductController from "./api/controllers/product";
import ProductRepository from "./repositories/product";
import ProductService from "./services/product";
import { ICategoryConrtoller } from "./api/controllers/interfaces/categories";
import { ICategoryService } from "./services/interfaces/categories";
import { ICategoryRepository } from "./repositories/interfaces/categories";
import CategoryController from "./api/controllers/categories";
import CategoryRouter from "./api/routes/categories";
import CategoryRepository from "./repositories/categories";
import CategoryService from "./services/categories";
import CartController from "./api/controllers/cart";
import CartRouter from "./api/routes/cart";
import CartRepository from "./repositories/cart";
import CartService from "./services/cart";
import { ICartController } from "./api/controllers/interfaces/cart";
import { ICartService } from "./services/interfaces/cart";
import { ICartRepository } from "./repositories/interfaces/cart";
import { IPaymentController } from "./api/controllers/interfaces/payment";
import { IPaymentService } from "./services/interfaces/payment";
import { IPaymentRepository } from "./repositories/interfaces/payment";
import PaymentController from "./api/controllers/payment";
import PaymentRouter from "./api/routes/payment";
import PaymentRepository from "./repositories/payment";
import PaymentService from "./services/payment";
import { IProfileController } from "./api/controllers/interfaces/profile";
import ProfileController from "./api/controllers/profile";
import ProfileRouter from "./api/routes/profile";


decorate(injectable(), BaseRouter);
decorate(injectable(), EventDispatcher);


const container = new Container();

container.bind<Subscribers>(TYPES.Subscribers).to(Subscribers).inSingletonScope()
container.bind<IConnector>(TYPES.Connector).to(KafkaConnector).inSingletonScope()

container.bind<IRouter>(TYPES.IndexRouter).to(IndexRouter).inSingletonScope()

container.bind<IRouter>(TYPES.AuthRouter).to(AuthRouter).inSingletonScope()
container.bind<IAuthController>(TYPES.AuthController).to(AuthController).inSingletonScope()

container.bind<IRouter>(TYPES.UserRouter).to(UserRouter).inSingletonScope()
container.bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope()
container.bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope()
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope()

container.bind<IRouter>(TYPES.TokenRouter).to(TokenRouter).inSingletonScope()
container.bind<ITokenController>(TYPES.TokenController).to(TokenController).inSingletonScope()
container.bind<ITokenService>(TYPES.TokenService).to(TokenService).inSingletonScope()
container.bind<ITokenRepository>(TYPES.TokenRepository).to(TokenRepository).inSingletonScope()

container.bind<IRouter>(TYPES.ProvinceRouter).to(ProvinceRouter).inSingletonScope()
container.bind<IProvinceController>(TYPES.ProvinceController).to(ProvinceController).inSingletonScope()
container.bind<IProvinceService>(TYPES.ProvinceService).to(ProvinceService).inSingletonScope()
container.bind<IProvinceRepository>(TYPES.ProvinceRepository).to(ProvinceRepository).inSingletonScope()

container.bind<IRouter>(TYPES.CityRouter).to(CityRouter).inSingletonScope()
container.bind<ICityController>(TYPES.CityController).to(CityController).inSingletonScope()
container.bind<ICityService>(TYPES.CityService).to(CityService).inSingletonScope()
container.bind<ICityRepository>(TYPES.CityRepository).to(CityRepository).inSingletonScope()

container.bind<IRouter>(TYPES.DistrictRouter).to(DistrictRouter).inSingletonScope()
container.bind<IDistrictController>(TYPES.DistrictController).to(DistrictController).inSingletonScope()
container.bind<IDistrictService>(TYPES.DistrictService).to(DistrictService).inSingletonScope()
container.bind<IDistrictRepository>(TYPES.DistrictRepository).to(DistrictRepository).inSingletonScope()

container.bind<IRouter>(TYPES.VillageRouter).to(VillageRouter).inSingletonScope()
container.bind<IVillageController>(TYPES.VillageController).to(VillageController).inSingletonScope()
container.bind<IVillageSerivce>(TYPES.VillageService).to(VillageService).inSingletonScope()
container.bind<IVillageRepository>(TYPES.VillageRepository).to(VillageRepository).inSingletonScope()

container.bind<IRouter>(TYPES.SellerRequestRouter).to(SellerRequestRouter).inSingletonScope()
container.bind<ISellerRequestController>(TYPES.SellerRequestController).to(SellerRequestController).inSingletonScope()
container.bind<ISellerRequestService>(TYPES.SellerRequestService).to(SellerRequestService).inSingletonScope()
container.bind<ISellerRequestRepository>(TYPES.SellerRequestRepository).to(SellerRequestRepository).inSingletonScope()


container.bind<IRouter>(TYPES.ProfileRouter).to(ProfileRouter).inSingletonScope()
container.bind<IProfileController>(TYPES.ProfileController).to(ProfileController).inSingletonScope()
container.bind<IProfileService>(TYPES.ProfileService).to(ProfileService).inSingletonScope()
container.bind<IProfileRepository>(TYPES.ProfileRepository).to(ProfileRepository).inSingletonScope()

container.bind<ICommentService>(TYPES.CommentService).to(CommentService).inSingletonScope()
container.bind<ICommentRepository>(TYPES.CommentRepository).to(CommentRepository).inSingletonScope()

container.bind<IRouter>(TYPES.BankRouter).to(BankRouter).inSingletonScope()
container.bind<IBankController>(TYPES.BankController).to(BankController).inSingletonScope()
container.bind<IBankService>(TYPES.BankService).to(BankService).inSingletonScope()
container.bind<IBankRepository>(TYPES.BankRepository).to(BankRepository).inSingletonScope()

container.bind<IRouter>(TYPES.CategoryRouter).to(CategoryRouter).inSingletonScope()
container.bind<ICategoryConrtoller>(TYPES.CategoryController).to(CategoryController).inSingletonScope()
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService).inSingletonScope()
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository).inSingletonScope()

container.bind<IRouter>(TYPES.ProductRouter).to(ProductRouter).inSingletonScope()
container.bind<IProductController>(TYPES.ProductController).to(ProductController).inSingletonScope()
container.bind<IProductService>(TYPES.ProductService).to(ProductService).inSingletonScope()
container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository).inSingletonScope()

container.bind<IRouter>(TYPES.CartRouter).to(CartRouter).inSingletonScope()
container.bind<ICartController>(TYPES.CartController).to(CartController).inSingletonScope()
container.bind<ICartService>(TYPES.CartService).to(CartService).inSingletonScope()
container.bind<ICartRepository>(TYPES.CartRepository).to(CartRepository).inSingletonScope()

container.bind<IRouter>(TYPES.PaymentRouter).to(PaymentRouter).inSingletonScope()
container.bind<IPaymentController>(TYPES.PaymentController).to(PaymentController).inSingletonScope()
container.bind<IPaymentService>(TYPES.PaymentService).to(PaymentService).inSingletonScope()
container.bind<IPaymentRepository>(TYPES.PaymentRepository).to(PaymentRepository).inSingletonScope()

container.bind<IEmailService>(TYPES.EmailService).to(EmailService).inSingletonScope()

container.bind<EventDispatcher>(TYPES.ProducerDispatcher).to(ProducerDispatcher).inSingletonScope()
container.bind<EventDispatcher>(TYPES.ConsumerDispatcher).to(ConsumerDispatcher).inSingletonScope()

export { container };