import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';
import { ConfigService } from '@nestjs/config';

const customPrismaClient = (prismaClient: PrismaClient, url?: string) => {
  if (url) {
    return prismaClient.$extends(
      readReplicas({
        url,
      }),
    );
  }
  return prismaClient.$extends({});
};

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly configService: ConfigService) {
    super();
  }

  customPrismaClient: CustomPrismaClient;
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  get client() {
    if (!this.customPrismaClient) {
      const url =
        this.configService.get<string>('ENVIRONMENT') === 'local-dev'
          ? undefined
          : this.configService.get<string>('DATABASE_URL_REPLICA');
      this.customPrismaClient = customPrismaClient(this, url);
    }

    return this.customPrismaClient;
  }
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
