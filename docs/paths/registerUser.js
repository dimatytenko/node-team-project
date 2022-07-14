module.exports = {
  post: {
    tags: ['Users'],
    summary: 'Register a new user',
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
              name: {
                type: 'string',
              },
            },
            example: {
              email: 'user2@gmail.com',
              password: '123456325YGi',
              name: 'User',
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'User has been created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                code: { type: 'number' },
                data: {
                  properties: {
                    name: { type: 'string' },
                    email: { type: 'string' },
                  },
                },
              },
              example: {
                status: 'success',
                code: 201,
                data: {
                  email: 'user2@gmail.com',
                  name: 'User',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'User creation error',
      },
      409: {
        description: 'Email is already being used',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
