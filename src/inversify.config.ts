
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

container.bind<IEmailService>(TYPES.EmailService).to(EmailService).inSingletonScope()

container.bind<EventDispatcher>(TYPES.ProducerDispatcher).to(ProducerDispatcher).inSingletonScope()
container.bind<EventDispatcher>(TYPES.ConsumerDispatcher).to(ConsumerDispatcher).inSingletonScope()

export { container };