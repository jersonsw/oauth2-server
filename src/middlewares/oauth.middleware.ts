import {Injectable, MiddlewareFunction, NestMiddleware} from "@nestjs/common";
import OAuth2Server = require("oauth2-server");
import {oauth2Model} from "../oauth/models";

const oauth2Server = new OAuth2Server({
    model: oauth2Model
});

@Injectable()
export class OAuthMiddleware implements NestMiddleware {

    async resolve(authenticateOptions?: any): Promise<MiddlewareFunction> {
        return async (req, res, next) => {
            const options: undefined | any = authenticateOptions || {};
            const request = new OAuth2Server.Request(req);
            const response = new OAuth2Server.Response(res);
            console.log(request.headers);
            try {
                const token = await oauth2Server.authenticate(request, response, options);
                req.user = token;
                next();
            } catch (err) {
                res.status(err.code || 500).json(err);
            }
        };

    }

}