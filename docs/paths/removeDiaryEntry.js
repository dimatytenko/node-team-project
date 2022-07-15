module.exports = {
  delete: {
    tags: ['Diary'],
    summary: 'Delete an entry about the eaten product from the diary',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: 'diaryId',
        in: 'path',
        description: 'ID records in the journal for the day',
        required: true,
        type: 'string',
        format: 'ObjectId',
      },
    ],
    responses: {
      200: {
        description: 'Product entry deleted',
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
                message: { type: 'string' },
                data: {
                  type: 'object',
                  properties: {
                    removedProduct: {
                      type: 'object',
                      properties: {
                        _id: {
                          type: 'string',
                          format: 'ObjectId',
                          description:
                            'Unique ID in the diary (use to delete the entry from the diary (Diary))',
                        },
                        product_id: {
                          type: 'string',
                          format: 'ObjectId',
                          description: 'Unique ID product',
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
                code: 200,
                message: 'Product has been removed',
                data: {
                  removedProduct: {
                    _id: '62d060a9ce900d24ba4469e2',
                    product_id: '5d51694802b2373622ff553b',
                    day_id: '62d0609a717da35cbf4b9350',
                    user_id: '62c60c0cd34841581a4cc208',
                    weight: 165,
                    calories: 1028,
                    createdAt: '2022-07-14T18:30:01.885Z',
                    updatedAt: '2022-07-14T18:30:01.885Z',
                  },
                  summary: {
                    _id: '62d0609a717da35cbf4b9350',
                    date: '2022-07-14T00:00:00.000Z',
                    user_id: '62c60c0cd34841581a4cc208',
                    daily_rate: 2800,
                    left: 1772,
                    consumed: 1028,
                    percentage_of_normal: 37,
                    createdAt: '2022-07-14T18:29:46.512Z',
                    updatedAt: '2022-07-14T18:31:07.122Z',
                  },
                },
              },
            },
          },
        },
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
