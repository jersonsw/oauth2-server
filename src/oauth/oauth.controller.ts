import {Controller, Post, Req, Res} from "@nestjs/common";
import {OAuthService} from "./oauth.service";
import {oauth2Model} from "./models/oauth2";
import * as OAuth2Server from "oauth2-server";
import {AccessToken} from "./models";

const oauth2Server = new OAuth2Server({
    model: oauth2Model
});

@Controller('/oauth/auth')
export class OAuthController {

    constructor(private readonly oauthService: OAuthService) {
    }

    @Post("/token")
    accessToken(@Req() req, @Res() res) {
        const request = new OAuth2Server.Request(req);
        const response = new OAuth2Server.Response(res);
        oauth2Server.token(request, response)
            .then((token: AccessToken) => {
                res.json(token);
            }).catch((err: any) => {
                //console.log(err);
            res.status(err.code || 500).json(err);
        });
    }

}