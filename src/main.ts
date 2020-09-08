require('module-alias/register');
import 'reflect-metadata';

import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Config } from './config/index';
import { TokenAuthGuard } from './guard/auth.guard';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { Provider } from 'oidc-provider';
import { AuthProviderConfig } from '@config/auth-provider';
import { OidcSequelizeAdapter } from '@adapters/oidc-postgres';

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

    const oidcAdapter = OidcSequelizeAdapter;
    await OidcSequelizeAdapter.connect();

    const oidc = new Provider(Config.OAUTH_ISSUER, {
        adapter: oidcAdapter,
        ...AuthProviderConfig
    });
    app.use('/oauth', oidc.callback)

    await app.listen(Config.PORT);
}
bootstrap();
