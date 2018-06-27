import {Module} from '@nestjs/common';
import {OAuthController} from "./oauth.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OAuthService} from "./oauth.service";
import {User, Client} from "./models";
import {UsersController} from "./users.controller";
import {ClientsController} from "./clients.controller";



@Module({
    imports: [TypeOrmModule.forFeature([User, Client])],
    controllers: [OAuthController, UsersController, ClientsController],
    components: [OAuthService]
})
export class OAuthModule {
}
