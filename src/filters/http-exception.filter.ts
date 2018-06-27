import {Catch, ExceptionFilter, HttpException} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, response: any): any {
        response
            .status(exception.getStatus())
            .json({message: exception.getResponse()['message']});
    }

}