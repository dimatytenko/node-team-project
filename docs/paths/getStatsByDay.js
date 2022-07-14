module.exports = {
  get: {
    tags: ['Diary'],
    summary: `Get user's statistics for a specific day`,
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        in: 'path',
        name: 'day',
        required: true,
        schema: { type: 'string' },
        description: 'Day in format YYYY-MM-DD to get stats for',
      },
    ],
    responses: {
      200: {
        description: 'Statistics returned',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                },
                code: {
                  type: 'number',
                },
                data: {
                  type: 'object',
                  properties: {
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
                    productsForDay: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          _id: {
                            type: 'string',
                            description: 'Backend-generated unique identifier',
                          },
                          product_id: {
                            type: 'object',
                            properties: {
                              _id: {
                                type: 'string',
                                description:
                                  'Backend-generated unique identifier',
                              },
                              title: {
                                type: 'object',
                                properties: {
                                  en: { type: 'string' },
                                  ua: { type: 'string' },
                                },
                                description: `Product's name`,
                              },
                            },
                          },
                          user_id: {
                            type: 'string',
                            description: `User's id`,
                          },
                          day_id: {
                            type: 'string',
                            description: `Day's id`,
                          },
                          weight: {
                            type: 'number',
                            description: `Weight of the consumed product in grams`,
                          },
                          calories: {
                            type: 'number',
                            description: `Number of calories. The product of the calorie content of the product by its weight`,
                          },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                status: 'success',
                code: 201,
                data: {
                  summary: {
                    _id: '62cf433b9c564878647d98cd',
                    date: '2022-07-14T00:00:00.000Z',
                    user_id: '62c9c71ccf6dbfd2a26a90be',
                    daily_rate: 1353.25,
                    left: 919.25,
                    consumed: 434,
                    percentage_of_normal: 32,
                  },
                  productsForDay: [
                    {
                      id: '62cf433b9c564878647d98cf',
                      product_id: {
                        title: {
                          en: 'Myllyn Paras Oatmeal with Strawberries and Sugar',
                          ua: 'Вівсяна каша Myllyn Paras з полуницею і цукром',
                        },
                        _id: '5d51694802b2373622ff5598',
                      },
                      day_id: '62cf433b9c564878647d98cd',
                      user_id: '62c9c71ccf6dbfd2a26a90be',
                      weight: 120,
                      calories: 434,
                    },
                  ],
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Invalid date',
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
