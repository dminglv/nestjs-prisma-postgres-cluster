export function generateOkResponse(
  description: string,
  data?: any,
  type?: any,
) {
  const response: any = {
    description: description,
  };

  if (data) {
    response.schema = { properties: data };
  } else if (type) {
    response.type = type;
  }

  return response;
}

export function generateCreatedResponse(
  description: string,
  data?: any,
  type?: any,
) {
  const response: any = {
    description: description,
  };

  if (data) {
    response.schema = { properties: data };
  } else if (type) {
    response.type = type;
  }

  return response;
}

export function generateBadRequestResponse(description: string, message: any) {
  return {
    description,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Error message',
          example: message,
        },
        error: {
          type: 'string',
          description: 'Error type',
          example: 'Bad Request',
          nullable: false,
        },
        statusCode: {
          description: 'HTTP status code',
          example: 400,
        },
      },
    },
  };
}

export function generateNotFoundResponse(description: string, message: any) {
  return {
    description,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Error message',
          example: message,
        },
        error: {
          type: 'string',
          description: 'Error type',
          example: 'Not Found',
          nullable: false,
        },
        statusCode: {
          description: 'HTTP status code',
          example: 404,
        },
      },
    },
  };
}

export function generateTooManyRequestsResponse(
  maxRequests: number,
  timeInterval: number,
) {
  return {
    description: `Large number of requests sent (more then ${maxRequests} in ${timeInterval} sec)`,
    schema: {
      type: 'object',
      properties: {
        statusCode: {
          type: 'integer',
          description: 'HTTP status code',
          example: 429,
        },
        message: {
          type: 'string',
          description: 'Error message',
          example: `ThrottlerException: Too Many Requests`,
        },
      },
    },
  };
}
