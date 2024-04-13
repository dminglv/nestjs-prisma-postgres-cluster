import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  async getOrdersList(): Promise<{ orders: [] }> {
    return {
      orders: [],
    };
  }
}
