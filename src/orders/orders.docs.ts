import {
  generateCreatedResponse,
  generateOkResponse,
  generateTooManyRequestsResponse,
} from '../common/swagger/message-generator';

const ordersOkResp = {
  orders: {
    description: 'orders list',
    example: [
      {
        id: '08850452-3ba6-4db6-bafc-3b773e3afb60',
        created: '2024-04-13T12:57:40.296Z',
      },
    ],
    nullable: false,
  },
};

const ordersCreatedResp = {
  id: {
    description: 'order created id',
    example: '08850452-3ba6-4db6-bafc-3b773e3afb60',
    nullable: false,
  },
  created: {
    description: 'order created date',
    example: '2024-04-13T12:57:40.296Z',
    nullable: false,
  },
};

const getOrdersListDoc = {
  ApiOkResponse: generateOkResponse('Get orders list', ordersOkResp),
  ApiTooManyRequestsResponse: generateTooManyRequestsResponse(10, 60),
};

const createOrderDoc = {
  ApiCreatedResponse: generateCreatedResponse(
    'Order is created',
    ordersCreatedResp,
  ),
  ApiTooManyRequestsResponse: generateTooManyRequestsResponse(10, 60),
};

export const ordersDocs = {
  getOrdersListDoc,
  createOrderDoc,
};
