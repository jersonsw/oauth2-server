import {ExpressMiddleware, Middleware, NestMiddleware} from "@nestjs/common";

@Middleware()
export class LoggerMiddleware implements NestMiddleware {

    async resolve(name:string): Promise<ExpressMiddleware> {
        return async (req, res, next) => {
            console.log({headers: req.headers, body: req.body});
            next();
        };

    }

}