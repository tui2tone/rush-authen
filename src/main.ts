require('module-alias/register');
import 'reflect-metadata';

import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as es6Renderer from 'express-es6-template-engine';
import { AppModule } from './app.module';
import { Config } from './config/index';
import { TokenAuthGuard } from './guard/auth.guard';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { OidcSequelizeAdapter } from '@adapters/oidc-postgres';
import { AuthProvider } from '@utils/auth-provider';
import { join } from 'path';
import * as session from 'express-session';
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

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

    app.useStaticAssets(join(__dirname, '..', 'app/build/_dist_'), { prefix: '/_dist_' });
    app.useStaticAssets(join(__dirname, '..', 'app/build/__snowpack__'), { prefix: '/__snowpack__' });
    app.useStaticAssets(join(__dirname, '..', 'app/build/web_modules'), { prefix: '/web_modules' });
    app.useStaticAssets(join(__dirname, '..', 'app/build/assets'), { prefix: '/assets' });
    app.setBaseViewsDir(join(__dirname, '..', 'app/build'));
    app.engine('html', es6Renderer);
    app.set('view engine', 'html');

    app.use(session({
        secret: 'happy dog',
        saveUninitialized: true,
        resave: true
    }));

    app.use(cookieParser());
    app.use(flash());

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
