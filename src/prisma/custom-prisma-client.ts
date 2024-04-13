import { PrismaClient } from '@prisma/client';
import { readReplicas } from '@prisma/extension-read-replicas';
import * as process from 'node:process';

export const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(
    readReplicas({
      url: process.env.DATABASE_URL_REPLICA,
    }),
  );
};

export class PrismaClientExtended extends PrismaClient {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (process.env.ENVIROMENT === 'local-dev') return this;

    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient;
  }
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
