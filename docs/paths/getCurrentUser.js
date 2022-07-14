module.exports = {
  get: {
    tags: ['Users'],
    summary: 'Get information about the current user',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'User being returned',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                code: { type: 'number' },
                data: {
                  properties: {
                    user: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        email: { type: 'string' },
                        blood: { type: 'number' },
                        height: { type: 'number' },
                        age: { type: 'number' },
                        weight_current: { type: 'number' },
                        weight_desired: { type: 'number' },
                        daily_rate: { type: 'number' },
                      },
                    },
                  },
                },
              },
              example: {
                status: 'success',
                code: 200,
                data: {
                  user: {
                    email: 'user27890@gmail.com',
                    name: 'user1',
                    blood: 1,
                    height: 170,
                    age: 27,
                    weight_current: 60,
                    weight_desired: 55,
                    daily_rate: 1200,
                  },
                },
              },
            },
          },
        },
      },
      401: {
        description: 'Not authorized',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
