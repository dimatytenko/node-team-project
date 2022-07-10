module.exports = {
  get: {
    tags: ['Products'],
    summary:
      'Get all the products matching the request. Without a query string, returns all products from the database',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'query',
        name: 'search',
        description: 'Product to find',
      },
    ],
    responses: {
      200: {
        description: 'Products returned',
      },
      400: {
        description: 'Bad Request',
      },
      401: {
        description: 'Valid token required / Not authorized',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
