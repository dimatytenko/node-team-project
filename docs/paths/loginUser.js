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
