module.exports = {
  patch: {
    tags: ['Users'],
    summary: `Update the user's profile with the received fields and daily kcal rate. Get in response the daily kcal rate and a list of non-recommended products`,
    security: [{ bearerAuth: [] }],
    requestBody: {
      required: 'true',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: [
              'height',
              'age',
              'weight_desired',
              'weight_current',
              'blood',
            ],
            properties: {
              height: {
                type: 'number',
                min: 100,
                max: 250,
                description: `User's height in cm`,
              },
              age: {
                type: 'number',
                min: 18,
                max: 100,
                description: `User's age`,
              },
              weight_current: {
                type: 'number',
                min: 20,
                max: 500,
                description: `User's current weight in kg`,
              },
              weight_desired: {
                type: 'number',
                min: 20,
                max: 500,
                description: `User's desired weight in kg`,
              },
              blood: {
                type: 'number',
                oneOf: [1, 2, 3, 4],
                description: `User's blood type`,
              },
            },
            example: {
              height: 170,
              age: 30,
              weight_desired: 60,
              weight_current: 65,
              blood: 1,
            },
          },
        },
      },
    },
    responses: {
      200: {
        description:
          'User profile updated. Daily kcal rate and a list of non-recommended products returned',
      },
      400: {
        description: 'Bad request',
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
