module.exports = {
  delete: {
    tags: ['Diary'],
    summary: 'Delete an entry about the eaten product from the diary',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'Product entry deleted',
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
