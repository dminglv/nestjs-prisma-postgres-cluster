import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';

export const customPrismaClient = (
  prismaClient: PrismaClient,
  url?: string,
) => {
  if (url) {
    return prismaClient.$extends(
      readReplicas({
        url,
      }),
    );
  }
  return prismaClient.$extends({});
};

export class PrismaClientExtended extends PrismaClient {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.customPrismaClient) {
      const url =
        process.env.ENVIRONMENT === 'local-dev'
          ? undefined
          : process.env.DATABASE_URL_REPLICA;
      this.customPrismaClient = customPrismaClient(this, url);
    }

    return this.customPrismaClient;
  }
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
