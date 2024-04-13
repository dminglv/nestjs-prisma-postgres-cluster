import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';

import { OrdersService } from './orders.service';

import { ordersDocs } from './orders.docs';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Get orders list',
  })
  @ApiOkResponse(ordersDocs.getOrdersListDoc.ApiOkResponse)
  @ApiTooManyRequestsResponse(
    ordersDocs.getOrdersListDoc.ApiTooManyRequestsResponse,
  )
  @Get()
  async getOrdersList(): Promise<{ orders: [] }> {
    return await this.ordersService.getOrdersList();
  }
}
