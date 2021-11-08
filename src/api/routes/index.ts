import { Router } from "express";
import IRouter from './interfaces/router'

import { injectable, inject } from "inversify";
import { TYPES } from '../../types';

@injectable()
class IndexRouter {
  public router: Router;

  constructor(

    @inject(TYPES.UserRouter) private userRouter: IRouter,
    @inject(TYPES.AuthRouter) private authRouter: IRouter,
    // @inject(TYPES.CommentRouter) private commentRouter: IRouter,
    // @inject(TYPES.LikeRouter) private likeRouter: IRouter,
    // @inject(TYPES.CategoryRouter) private categoryRouter: IRouter,
    @inject(TYPES.TokenRouter) private tokenRouter: IRouter,
    @inject(TYPES.ProvinceRouter) private provinceRouter: IRouter,
    @inject(TYPES.CityRouter) private cityRouter: IRouter,
    @inject(TYPES.DistrictRouter) private districtRouter: IRouter,
    @inject(TYPES.VillageRouter) private villageRouter: IRouter,
    @inject(TYPES.SellerRequestRouter) private sellerRequestRouter: IRouter,
    @inject(TYPES.BankRouter) private bankRouter: IRouter,
    @inject(TYPES.ProductRouter) private productRouter: IRouter,
    @inject(TYPES.CartRouter) private cartRouter: IRouter,
    @inject(TYPES.PaymentRouter) private paymentRouter: IRouter,
    @inject(TYPES.ProfileRouter) private profileRouter: IRouter

  ) {
    this.router = Router();
    this.routes();
  }

  routes(): IRouter {
    this.router.use("/api/v1/users", this.userRouter.router)
    this.router.use("/api/v1/auth", this.authRouter.router)
    this.router.use("/api/v1/profiles", this.profileRouter.router)
    // this.router.use("/api/v1/comments", this.commentRouter.router)
    // this.router.use("/api/v1/category", this.categoryRouter.router)
    // this.router.use("/api/v1/likes", this.likeRouter.router)
    this.router.use("/api/v1/token", this.tokenRouter.router)
    this.router.use("/api/v1/provinces", this.provinceRouter.router)
    this.router.use("/api/v1/cities", this.cityRouter.router)
    this.router.use("/api/v1/districts", this.districtRouter.router)
    this.router.use("/api/v1/villages", this.villageRouter.router)
    this.router.use("/api/v1/seller-requests", this.sellerRequestRouter.router)
    this.router.use("/api/v1/banks", this.bankRouter.router)
    this.router.use("/api/v1/products", this.productRouter.router)
    this.router.use("/api/v1/carts", this.cartRouter.router)
    this.router.use("/api/v1/payments", this.paymentRouter.router)
    return this
  }

}
export default IndexRouter;
