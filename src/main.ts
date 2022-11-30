import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { urlencoded, json } from 'express';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: {
            origin: '*',
            methods: '*',
            allowedHeaders: '*',
        },
        bufferLogs: true,
    });
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));
    app.setGlobalPrefix('api');
    const configService = app.get(ConfigService);
    const port = configService.get('PORT');

    const config = new DocumentBuilder()
        .setTitle('Centro recreacional api')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);
    app.useGlobalPipes(new ValidationPipe());
    app.useStaticAssets(join(__dirname, '../uploads'), {
        prefix: '/uploads',
    });
    await app.listen(port);
}
bootstrap();
