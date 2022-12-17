// Core
import { Global, Module } from '@nestjs/common';

// Service
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
/**
 * The global module class of Prisma.
 */
export class PrismaModule {}
