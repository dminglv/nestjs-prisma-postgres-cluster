import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';

import { version } from '../package.json';

const SWAGGER_TITLE = 'NestJS template';
const SWAGGER_DESCRIPTION = 'Description of API methods';
const SWAGGER_PREFIX = '/docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    cors: {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    },
  });

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const configService = app.get(ConfigService);
  const environment = configService.get<string>('ENVIRONMENT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );
  app.use(helmet());
  app.use(cookieParser());

  if (['local-dev', 'development'].includes(environment)) {
    const options = new DocumentBuilder()
      .setTitle(SWAGGER_TITLE)
      .setDescription(SWAGGER_DESCRIPTION)
      .addBearerAuth()
      .setVersion(version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_PREFIX, app, document);
    Logger.log('Swagger has been launched', 'Swagger');
  }

  await app.listen(configService.get<number>('PORT'));
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);

  const defaultExitCode = 1;
  process.exit(defaultExitCode);
});
