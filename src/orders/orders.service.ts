import { Injectable } from '@nestjs/common';
import { orders } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOrdersList(): Promise<{ orders: orders }> {
    const ordersInDB = await this.prismaService.client.orders.findMany();

    return {
      orders: ordersInDB,
    };
  }

  async createOrder(): Promise<orders> {
    return await this.prismaService.client.orders.create({
      data: {},
    });
  }
}
