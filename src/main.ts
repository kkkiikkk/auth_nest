// Core
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

// App module
import { AppModule } from './app.module';

// Tools
import { ENV } from './utils';

/* ******************************************************************************************
 *
 * Function: Server instance creator
 * Description: The entry file of the application which uses the core function
 *              NestFactory to create a Nest application instance.
 *
 * ***************************************************************************************** */
(async () => {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix(<string>config.get(ENV[ENV.PREFIX]), {
    exclude: ['/'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );

  await app.listen(
    <number>config.get(ENV[ENV.PORT]),
    <string>config.get(ENV[ENV.HOST]),
  );
})();
