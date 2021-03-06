
const TYPES = {
    Subscribers: Symbol.for("Subscribers"),
    Connector: Symbol.for("Connector"),
    IndexRouter: Symbol.for("IndexRouter"),
    AuthRouter: Symbol.for("AuthRouter"),
    AuthController: Symbol.for("AuthController"),
    UserRouter: Symbol.for("UserRouter"),
    UserController: Symbol.for("UserController"),
    UserService: Symbol.for("UserService"),
    UserRepository: Symbol.for("UserRepository"),
    ProfileRouter: Symbol.for("ProfileRouter"),
    ProfileController: Symbol.for("ProfileController"),
    ProfileService: Symbol.for("ProfileService"),
    ProfileRepository: Symbol.for("ProfileRepository"),
    CommentRouter: Symbol.for("CommentRouter"),
    CommentController: Symbol.for("CommentController"),
    CommentService: Symbol.for("CommentService"),
    CommentRepository: Symbol.for("CommentRepository"),
    LikeRouter: Symbol.for("LikeRouter"),
    LikeController: Symbol.for("LikeController"),
    LikeService: Symbol.for("LikeService"),
    LikeRepository: Symbol.for("LikeRepository"),
    CategoryRouter: Symbol.for("CategoryRouter"),
    CategoryController: Symbol.for("CategoryController"),
    CategoryService: Symbol.for("CategoryService"),
    CategoryRepository: Symbol.for("CategoryRepository"),

    EmailService: Symbol.for("EmailService"),

    TokenRouter: Symbol.for("TokenRouter"),
    TokenController: Symbol.for("TokenController"),
    TokenService: Symbol.for("TokenService"),
    TokenRepository: Symbol.for("TokenRepository"),

    ProvinceRouter: Symbol.for("ProvinceRouter"),
    ProvinceController: Symbol.for("ProvinceController"),
    ProvinceService: Symbol.for("ProvinceService"),
    ProvinceRepository: Symbol.for("ProvinceRepository"),

    CityRouter: Symbol.for("CityRouter"),
    CityController: Symbol.for("CityController"),
    CityService: Symbol.for("CityService"),
    CityRepository: Symbol.for("CityRepository"),

    DistrictRouter: Symbol.for("DistrictRouter"),
    DistrictController: Symbol.for("DistrictController"),
    DistrictService: Symbol.for("DistrictService"),
    DistrictRepository: Symbol.for("DistrictRepository"),


    VillageRouter: Symbol.for("VillageRouter"),
    VillageController: Symbol.for("VillageController"),
    VillageService: Symbol.for("VillageService"),
    VillageRepository: Symbol.for("VillageRepository"),


    SellerRequestRouter: Symbol.for("SellerRequestRouter"),
    SellerRequestController: Symbol.for("SellerRequestController"),
    SellerRequestService: Symbol.for("SellerRequestService"),
    SellerRequestRepository: Symbol.for("SellerRequestRepository"),

    BankRouter: Symbol.for("BankRouter"),
    BankController: Symbol.for("BankController"),
    BankService: Symbol.for("BankService"),
    BankRepository: Symbol.for("BankRepository"),

    ProductRouter: Symbol.for("ProductRouter"),
    ProductController: Symbol.for("ProductController"),
    ProductService: Symbol.for("ProductService"),
    ProductRepository: Symbol.for("ProductRepository"),

    CartRouter: Symbol.for("CartRouter"),
    CartController: Symbol.for("CartController"),
    CartService: Symbol.for("CartService"),
    CartRepository: Symbol.for("CartRepository"),

    PaymentRouter: Symbol.for("PaymentRouter"),
    PaymentController: Symbol.for("PaymentController"),
    PaymentService: Symbol.for("PaymentService"),
    PaymentRepository: Symbol.for("PaymentRepository"),

    ProducerDispatcher: Symbol.for("ProducerDispatcher"),
    ConsumerDispatcher: Symbol.for("ConsumerDispatcher")
};

export { TYPES };