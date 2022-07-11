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
                description: 'ID продукта',
              },
              weight: {
                type: 'integer',
                description: 'колличество продукта',
              },
              date: {
                type: 'string',
                description:
                  'дата (когда продукт был съеден) в виде строки, в формате YYYY-MM-DD',
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
                    _id: {
                      type: 'string',
                      format: 'ObjectId',
                      description:
                        'уникальный ID в журнале (использовать для удаления записи из журнала (diary))',
                    },
                    product_id: {
                      type: 'string',
                      format: 'ObjectId',
                      description: 'уникальный ID продукта',
                    },
                    day_id: {
                      type: 'string',
                      format: 'ObjectId',
                      description: 'уникальный ID дня',
                    },
                    weight: {
                      type: 'integer',
                      format: 'Int32',
                      description: 'вес съеденого продукта',
                    },
                    calories: {
                      type: 'integer',
                      format: 'Int32',
                      description:
                        'колличество килокалорий в съеденом продукте',
                    },
                    user_id: {
                      type: 'string',
                      format: 'ObjectId',
                      description:
                        'уникальный ID пользователя которому пренадлежит данная запись',
                    },
                    createdAt: {
                      type: 'date',
                      format: 'isoDate',
                      description: 'дата создания записи а БД',
                    },
                    updatedAt: {
                      type: 'date',
                      format: 'isoDate',
                      description: 'дата последнего обновления записи в БД',
                    },
                  },
                },
              },
              example: {
                status: 'success',
                code: 201,
                data: {
                  _id: '62cb3422d9b4ae6849a6e38e',
                  product_id: '5d51694802b2373622ff553b',
                  day_id: '62cb25463a3dc076b39df817',
                  user_id: '62c60c0cd34841581a4cc208',
                  weight: 165,
                  calories: 1028,
                  createdAt: '2022-07-10T20:18:42.893Z',
                  updatedAt: '2022-07-10T20:18:42.893Z',
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
