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
import { OidcSequelizeAdapter } from '@adapters/oidc-postgres';
import { AuthProvider } from '@utils/auth-provider';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
    );
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    const reflector = app.get(Reflector);
    app.useGlobalGuards(new TokenAuthGuard(reflector));

    app.useGlobalInterceptors(new RequestInterceptor());
    app.useGlobalInterceptors(new ResponseInterceptor());

    app.useStaticAssets(join(__dirname, '..', 'views/_site/assets'), {
        prefix: '/assets'
    });
    app.useStaticAssets(join(__dirname, '..', 'views/_site/style.css'), {
        prefix: '/style.css'
    });
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');

    const options = new DocumentBuilder()
        .setTitle('Rush Plan API')
        .setDescription('Rush Plan API')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await OidcSequelizeAdapter.connect();

    app.use('/oauth', AuthProvider.callback)

    await app.listen(Config.PORT);
}
bootstrap();
