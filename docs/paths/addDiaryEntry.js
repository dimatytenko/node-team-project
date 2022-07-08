module.exports = {
  post: {
    tags: ['Diary'],
    summary: 'Make a new entry about the eaten product in the diary',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'Product entry added',
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
