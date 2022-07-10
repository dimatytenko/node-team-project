module.exports = {
  post: {
    tags: ['Users'],
    summary: 'Log out user',
    security: [{ bearerAuth: [] }],
    responses: {
      204: {
        description: 'User has been logged out',
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
