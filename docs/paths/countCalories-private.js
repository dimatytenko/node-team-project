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
                    summary: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          description: 'Backend-generated unique identifier',
                        },
                        date: {
                          description: `Date`,
                          type: 'date',
                        },
                        user_id: {
                          type: 'string',
                          description: `User's id`,
                        },
                        daily_rate: {
                          type: 'number',
                          description: `User's daily calorie intake`,
                        },
                        left: {
                          type: 'number',
                          description: `Number of calories the user can still eat. The difference between the daily kcal rate and consumed`,
                        },
                        consumed: {
                          type: 'number',
                          description: `Amount of calories the user has already eaten`,
                        },
                        percentage_of_normal: {
                          type: 'number',
                          description: `Percentage of consumed to daily kcal rate`,
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
                    _id: '62cf566cc24495ee8f18f637',
                    name: 'user1',
                    blood: 1,
                    height: 170,
                    age: 30,
                    weight_current: 65,
                    weight_desired: 60,
                    daily_rate: 1353,
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
                  summary: {
                    _id: '62d31b94d6bab1fcfebb2022',
                    date: '2022-07-16T00:00:00.000Z',
                    user_id: '62cf566cc24495ee8f18f637',
                    daily_rate: 1353,
                    left: 792,
                    consumed: 561,
                    percentage_of_normal: 41,
                    createdAt: '2022-07-16T20:12:04.332Z',
                    updatedAt: '2022-07-16T20:27:10.016Z',
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
      401: {
        description: 'Not authorized',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
