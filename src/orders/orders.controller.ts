import { Controller, Get, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { orders } from '@prisma/client';

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
  async getOrdersList(): Promise<{ orders: orders }> {
    return await this.ordersService.getOrdersList();
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiTags('Orders')
  @ApiOperation({
    summary: 'Create order',
  })
  @ApiCreatedResponse(ordersDocs.createOrderDoc.ApiCreatedResponse)
  @ApiTooManyRequestsResponse(
    ordersDocs.createOrderDoc.ApiTooManyRequestsResponse,
  )
  @Post()
  async createOrder(): Promise<orders> {
    return await this.ordersService.createOrder();
  }
}
