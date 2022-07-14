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
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                code: { type: 'number' },
                data: {
                  properties: {
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
                    notHealthy: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          categories: {
                            description: `Product's categories`,
                            type: 'array',
                            items: {
                              type: 'string',
                            },
                          },
                          weight: {
                            type: 'number',
                            description: `Product's weight in grams`,
                          },
                          title: {
                            type: 'object',
                            properties: {
                              en: { type: 'string' },
                              ua: { type: 'string' },
                            },
                            description: `Product's name`,
                          },
                          calories: {
                            type: 'number',
                            description: `Product's calories per 100 grams`,
                          },
                          groupBloodNotAllowed: {
                            type: 'array',
                            items: { type: 'mixed' },
                            description: `Boolean if this product is NOT recommended for a particular blood type`,
                          },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                status: 'success',
                code: 200,
                data: {
                  user: {
                    email: 'user27890@gmail.com',
                    name: 'user1',
                    blood: 1,
                    height: 170,
                    age: 27,
                    weight_current: 60,
                    weight_desired: 55,
                    daily_rate: 1200,
                  },
                  notHealthy: [
                    {
                      title: {
                        en: 'Milava cottage cheese low fat',
                        ua: 'Сир знежирений Милава',
                      },
                      _id: '5d51694902b2373622ff5824',
                      categories: ['dairy'],
                      weight: 100,
                      calories: 75,
                      groupBloodNotAllowed: [null, true, true, false, false],
                      __v: 0,
                    },
                    {
                      title: {
                        en: 'Buckwheat flakes Mistral',
                        ua: 'Гречані пластівці Містраль',
                      },
                      _id: '5d51694802b2373622ff5568',
                      categories: ['cereals'],
                      weight: 100,
                      calories: 345,
                      groupBloodNotAllowed: [null, true, false, true, true],
                      __v: 0,
                    },
                  ],
                },
              },
            },
          },
        },
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
