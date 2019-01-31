import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {AppConfig} from "./configs";
import {HttpExceptionFilter} from "./filters/http-exception.filter";
import {SwaggerConfig} from "./configs/swagger.config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix(AppConfig.server.basePath);
    SwaggerConfig.set(app);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(AppConfig.server.port);
}

bootstrap().then(() => {
    console.log("Application started on port: " + AppConfig.server.port);
}, (err) => {
    console.log("Unable to start the application.",err);
});
