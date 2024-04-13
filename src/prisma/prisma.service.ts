import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

const createPrismaExtended = (prisma: PrismaService, url: string) =>
  prisma.$extends(
    readReplicas({
      url,
    }),
  );

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private extendPrisma: ReturnType<typeof createPrismaExtended> | undefined;
  get client() {
    if (process.env.ENVIRONMENT === 'local-dev') {
      return this;
    }

    if (!this.extendPrisma) {
      this.extendPrisma = createPrismaExtended(
        this,
        process.env.DATABASE_URL_REPLICA,
      );
    }

    return this.extendPrisma;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
