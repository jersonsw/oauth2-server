import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {OAuthModule} from "./oauth/oauth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OAuthController} from "./oauth/oauth.controller";
import {LoggerMiddleware} from "./middlewares";

@Module({imports: [TypeOrmModule.forRoot(), OAuthModule]})
export class ApplicationModule implements NestModule {

    configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(OAuthController);
    }

}
