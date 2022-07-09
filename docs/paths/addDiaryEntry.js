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
              weight: 4565,
              date: '2022-07-08',
            },
          },
        },
      },
    },

    responses: {
      200: {
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
                      type: 'ObjectId',
                      format: 'string',
                      description: 'уникальный ID, генерится базой данных',
                    },
                    date: {
                      type: 'date',
                      format: 'isoDate',
                      description: 'дата когда продукт был съеден',
                    },
                    product_id: {
                      type: 'ObjectId',
                      format: 'string',
                      description: 'уникальный ID продукта',
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
                      type: 'ObjectId',
                      format: 'string',
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
                  _id: '62c969d0e6220e36d6d371ca',
                  date: '2022-07-08T00:00:00.000Z',
                  product_id: '5d51694802b2373622ff553b',
                  weight: 4565,
                  calories: 28440,
                  user_id: '62c60c0cd34841581a4cc208',
                  createdAt: '2022-07-09T11:43:12.388Z',
                  updatedAt: '2022-07-09T11:43:12.388Z',
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
