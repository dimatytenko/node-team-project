module.exports = {
  post: {
    tags: ['Users'],
    summary: 'Login user',
    parameters: [],
    requestBody: {
      required: 'true',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
            },
            example: {
              email: 'user2@gmail.com',
              password: '123456325YGi',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'User has been logged in',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                code: { type: 'number' },
                data: {
                  properties: {
                    token: { type: 'string' },
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
                  token: '...token...',
                  user: {
                    name: 'user1',
                    email: 'user27890@gmail.com',
                    blood: 1,
                    height: 170,
                    age: 30,
                    weight_current: 65,
                    weight_desired: 60,
                    daily_rate: 1353,
                  },
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
        description: 'Invalid credentials',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
