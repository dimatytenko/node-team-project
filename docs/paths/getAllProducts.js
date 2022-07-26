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
      {
        in: 'query',
        name: 'lang',
        default: 'en',
        schema: {
          enum: ['en', 'ua'],
        },
        description: 'Search language',
      },
    ],
    responses: {
      200: {
        description: 'Products returned',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                code: { type: 'number' },
                data: {
                  properties: {
                    total: { type: 'number' },
                    products: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: { type: 'string' },
                          _id: { type: 'string' },
                          categories: {
                            type: 'array',
                            items: { type: 'string' },
                          },
                          weight: { type: 'number' },
                          calories: { type: 'number' },
                          groupBloodNotAllowed: {
                            type: 'array',
                            items: {
                              type: 'mixed',
                              enum: [true, false, 'null'],
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                status: 'success',
                code: 200,
                data: {
                  total: 1,
                  products: [
                    {
                      title: {
                        en: 'Apple Golden',
                        ua: 'Яблуко Голден',
                      },
                      _id: '5d51694902b2373622ff5c00',
                      categories: ['fruit'],
                      weight: 100,
                      calories: 53,
                      groupBloodNotAllowed: [null, false, false, false, false],
                      __v: 0,
                    },
                  ],
                },
              },
            },
          },
        },
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
