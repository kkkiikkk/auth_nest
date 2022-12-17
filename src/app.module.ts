// Core
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

// Modules
import { PrismaModule } from './frameworks/services/database/prisma.module';
import { AuthModule } from './use-cases/auth/auth.module';

// Controllers
import { AuthController } from './controllers';

// Tools
import { TransformInterceptor, LoggerInterceptor } from './core/interceptors';

// Config
import {
  AuthConfig,
  ConfigOptions,
  DatabaseConfig,
  EnvironmentValidation,
  ServerConfig,
} from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ServerConfig, DatabaseConfig, AuthConfig],
      validationSchema: EnvironmentValidation,
      validationOptions: ConfigOptions,
    }),
    PrismaModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  controllers: [AuthController],
})
/**
 * The root module class of the application.
 */
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerInterceptor).forRoutes('*');
  }
}
