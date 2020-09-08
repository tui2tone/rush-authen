require('module-alias/register');
import 'reflect-metadata';

import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Config } from './config';
import { TokenAuthGuard } from './guard/auth.guard';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { Provider } from 'oidc-provider';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );
    app.enableCors();
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new ValidationPipe());

    const reflector = app.get(Reflector);
    app.useGlobalGuards(new TokenAuthGuard(reflector));

    app.useGlobalInterceptors(new RequestInterceptor());
    app.useGlobalInterceptors(new ResponseInterceptor());

    const options = new DocumentBuilder()
        .setTitle('Rush Plan API')
        .setDescription('Rush Plan API')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // OIDC PROVIDER
    const configuration = {
        clients: [{
            client_id: 'foo',
            client_secret: 'bar',
            redirect_uris: ['http://lvh.me:8080/cb']
        }],
    };
    const oidc = new Provider(`http://localhost:${Config.PORT}`, configuration);
    app.use('/oauth', oidc.callback)

    await app.listen(Config.PORT);
}
bootstrap();
