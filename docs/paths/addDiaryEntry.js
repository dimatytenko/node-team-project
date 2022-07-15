module.exports = {
  post: {
    tags: ['Diary'],
    summary: 'Make a new entry about the eaten product in the diary',
    security: [{ bearerAuth: [] }],
    parameters: [],
    requestBody: {
      required: 'true',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['productId', 'weight', 'date'],
            properties: {
              productId: {
                type: 'string',
                description: 'ID product',
              },
              weight: {
                type: 'integer',
                description: 'quantity',
              },
              date: {
                type: 'string',
                description:
                  'Date (when the product was eaten) in the form of a line, in YYYY-MM-DD format',
              },
            },
            example: {
              productId: '5d51694802b2373622ff553b',
              weight: 165,
              date: '2022-07-08',
            },
          },
        },
      },
    },

    responses: {
      201: {
        description: 'Product entry added',
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
                    addedProduct: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          format: 'ObjectId',
                          description:
                            'Unique ID in the diary (use to delete the entry from the diary (Diary))',
                        },
                        product_id: {
                          type: 'object',
                          properties: {
                            _id: {
                              type: 'string',
                              description:
                                'Backend-generated unique identifier',
                            },
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
                        day_id: {
                          type: 'string',
                          format: 'ObjectId',
                          description: 'Unique ID day',
                        },
                        weight: {
                          type: 'integer',
                          format: 'Int32',
                          description: 'The weight of the eaten product',
                        },
                        calories: {
                          type: 'integer',
                          format: 'Int32',
                          description:
                            'The number of kilocalories in the eaten product',
                        },
                        user_id: {
                          type: 'string',
                          format: 'ObjectId',
                          description: 'Unique user ID who owns this entry',
                        },
                        createdAt: {
                          type: 'date',
                          format: 'isoDate',
                          description:
                            'The date of creation of the record is a database',
                        },
                        updatedAt: {
                          type: 'date',
                          format: 'isoDate',
                          description:
                            'The date of the last recording of the recording in the database',
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
                        createdAt: {
                          type: 'date',
                          format: 'isoDate',
                          description:
                            'The date of creation of the record is a database',
                        },
                        updatedAt: {
                          type: 'date',
                          format: 'isoDate',
                          description:
                            'The date of the last recording of the recording in the database',
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
                  addedProduct: {
                    _id: '62d15f40009155ecea04b741',
                    product_id: {
                      title: {
                        en: 'Chicken egg (dry yolk)',
                        ua: 'Яйце куряче (жовток сухий)',
                      },
                      _id: '5d51694802b2373622ff553b',
                      categories: ['eggs'],
                      weight: 100,
                      calories: 623,
                      groupBloodNotAllowed: [null, true, false, false, false],
                      __v: 0,
                    },
                    day_id: '62d15f40009155ecea04b73f',
                    user_id: '62c60c0cd34841581a4cc208',
                    weight: 165,
                    calories: 1028,
                    createdAt: '2022-07-15T12:36:16.178Z',
                    updatedAt: '2022-07-15T12:36:16.178Z',
                  },
                  summary: {
                    _id: '62d15f40009155ecea04b73f',
                    date: '2022-01-01T00:00:00.000Z',
                    user_id: '62c60c0cd34841581a4cc208',
                    daily_rate: 2800,
                    left: 1772,
                    consumed: 1028,
                    percentage_of_normal: 37,
                    createdAt: '2022-07-15T12:36:16.111Z',
                    updatedAt: '2022-07-15T12:36:16.245Z',
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
      404: {
        description: 'Not found',
      },
      500: {
        description: 'Server error',
      },
    },
  },
};
