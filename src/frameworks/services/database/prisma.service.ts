// Core
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

// Tools
import { ENV } from '../../../utils';

@Injectable()
/**
 * The service class of Prisma
 */
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get<string>(ENV[ENV.DATABASE_URL], { infer: true }),
        },
      },
    });
  }

  /**
   * Connects to the database
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  /**
   * Disconnects from the database
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
