module.exports = {
  post: {
    tags: ['Public'],
    summary:
      'Get the daily kcal rate and a list of non-recommended products for an unregistered user',

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
          'Daily kcal rate and a list of non-recommended products returned',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: { type: 'string' },
                code: { type: 'number' },
                data: {
                  properties: {
                    dailyRate: { type: 'number' },
                    notHealthy: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          title: { type: 'string' },
                          _id: { type: 'string' },
                          categories: {
                            type: 'array',
                            items: { type: 'string' },
                          },
                          weight: { type: 'number' },
                          calories: { type: 'number' },
                          groupBloodNotAllowed: {
                            type: 'array',
                            items: {
                              type: 'mixed',
                              enum: [true, false, 'null'],
                            },
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
                  dailyRate: 1328.65,
                  notHealthy: [
                    {
                      title: {
                        en: 'Cottage cheese Chudo kiwi-banana',
                        ua: 'Сирок Чудо ківі-банан',
                      },
                      _id: '5d51694902b2373622ff583c',
                      categories: ['dairy'],
                      weight: 100,
                      calories: 123,
                      groupBloodNotAllowed: [null, true, true, false, false],
                      __v: 0,
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Server error',
    },
  },
};
