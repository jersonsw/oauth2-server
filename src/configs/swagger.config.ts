import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {AppConfig} from "./app.config";

export class SwaggerConfig {

    static set(app) {
        const options = new DocumentBuilder()
            .setTitle('Oauth2 Server')
            .setDescription('Oauth2 Server Documentation')
            .setVersion('1.0')
            .setContactEmail('jersonsw@outlook.com')
            .setSchemes('http')
            .addTag('Oauth')
            .setBasePath(AppConfig.server.basePath)
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('/api/v1/doc', app, document);
    }

}