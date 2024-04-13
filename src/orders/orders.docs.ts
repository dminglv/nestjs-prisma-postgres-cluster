import {
  generateOkResponse,
  generateTooManyRequestsResponse,
} from '../common/swagger/message-generator';

const ordersOkResp = {
  orders: {
    description: 'orders lists',
    example: [],
    nullable: false,
  },
};

const getOrdersListDoc = {
  ApiOkResponse: generateOkResponse('Get orders list', ordersOkResp),
  ApiTooManyRequestsResponse: generateTooManyRequestsResponse(10, 60),
};

export const ordersDocs = {
  getOrdersListDoc,
};
