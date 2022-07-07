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
              email: 'user@gmail.com',
              password: '5734YYG8',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'User has been logged in',
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
