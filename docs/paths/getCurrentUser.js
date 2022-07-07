module.exports = {
  get: {
    tags: ['Users'],
    summary: 'Get information about the current user',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'User being returned',
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
