import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

export const customPrismaClient = (prismaClient: PrismaClient, url: string) => {
  return prismaClient.$extends(
    readReplicas({
      url,
    }),
  );
};

export class PrismaClientExtended extends PrismaClient {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (process.env.ENVIRONMENT === 'local-dev') return this.$extends({});

    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(
        this,
        process.env.DATABASE_URL_REPLICA,
      );

    return this.customPrismaClient;
  }
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
