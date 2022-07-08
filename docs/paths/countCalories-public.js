module.exports = {
  post: {
    tags: ['Public'],
    summary: 'Get the daily kcal rate and a list of non-recommended products',
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
