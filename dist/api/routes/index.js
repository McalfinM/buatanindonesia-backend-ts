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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
let IndexRouter = class IndexRouter {
    userRouter;
    authRouter;
    tokenRouter;
    provinceRouter;
    cityRouter;
    districtRouter;
    villageRouter;
    sellerRequestRouter;
    bankRouter;
    productRouter;
    cartRouter;
    paymentRouter;
    profileRouter;
    router;
    constructor(userRouter, authRouter, 
    // @inject(TYPES.CommentRouter) private commentRouter: IRouter,
    // @inject(TYPES.LikeRouter) private likeRouter: IRouter,
    // @inject(TYPES.CategoryRouter) private categoryRouter: IRouter,
    tokenRouter, provinceRouter, cityRouter, districtRouter, villageRouter, sellerRequestRouter, bankRouter, productRouter, cartRouter, paymentRouter, profileRouter) {
        this.userRouter = userRouter;
        this.authRouter = authRouter;
        this.tokenRouter = tokenRouter;
        this.provinceRouter = provinceRouter;
        this.cityRouter = cityRouter;
        this.districtRouter = districtRouter;
        this.villageRouter = villageRouter;
        this.sellerRequestRouter = sellerRequestRouter;
        this.bankRouter = bankRouter;
        this.productRouter = productRouter;
        this.cartRouter = cartRouter;
        this.paymentRouter = paymentRouter;
        this.profileRouter = profileRouter;
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.use("/api/v1/users", this.userRouter.router);
        this.router.use("/api/v1/auth", this.authRouter.router);
        this.router.use("/api/v1/profiles", this.profileRouter.router);
        // this.router.use("/api/v1/comments", this.commentRouter.router)
        // this.router.use("/api/v1/category", this.categoryRouter.router)
        // this.router.use("/api/v1/likes", this.likeRouter.router)
        this.router.use("/api/v1/token", this.tokenRouter.router);
        this.router.use("/api/v1/provinces", this.provinceRouter.router);
        this.router.use("/api/v1/cities", this.cityRouter.router);
        this.router.use("/api/v1/districts", this.districtRouter.router);
        this.router.use("/api/v1/villages", this.villageRouter.router);
        this.router.use("/api/v1/seller-requests", this.sellerRequestRouter.router);
        this.router.use("/api/v1/banks", this.bankRouter.router);
        this.router.use("/api/v1/products", this.productRouter.router);
        this.router.use("/api/v1/carts", this.cartRouter.router);
        this.router.use("/api/v1/payments", this.paymentRouter.router);
        return this;
    }
};
IndexRouter = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRouter)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.AuthRouter)),
    __param(2, (0, inversify_1.inject)(types_1.TYPES.TokenRouter)),
    __param(3, (0, inversify_1.inject)(types_1.TYPES.ProvinceRouter)),
    __param(4, (0, inversify_1.inject)(types_1.TYPES.CityRouter)),
    __param(5, (0, inversify_1.inject)(types_1.TYPES.DistrictRouter)),
    __param(6, (0, inversify_1.inject)(types_1.TYPES.VillageRouter)),
    __param(7, (0, inversify_1.inject)(types_1.TYPES.SellerRequestRouter)),
    __param(8, (0, inversify_1.inject)(types_1.TYPES.BankRouter)),
    __param(9, (0, inversify_1.inject)(types_1.TYPES.ProductRouter)),
    __param(10, (0, inversify_1.inject)(types_1.TYPES.CartRouter)),
    __param(11, (0, inversify_1.inject)(types_1.TYPES.PaymentRouter)),
    __param(12, (0, inversify_1.inject)(types_1.TYPES.ProfileRouter))
], IndexRouter);
exports.default = IndexRouter;
