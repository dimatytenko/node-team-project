module.exports = {
  delete: {
    tags: ['Diary'],
    summary: 'Delete an entry about the eaten product from the diary',
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        name: 'diaryId',
        in: 'path',
        description: 'ID записи в журнале за день',
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
                code: 200,
                message: 'Product has been removed',
                data: {
                  _id: '62cb4130fc3feb13b33ff950',
                  product_id: '5d51694802b2373622ff553b',
                  day_id: '62cb25463a3dc076b39df817',
                  user_id: '62c60c0cd34841581a4cc208',
                  weight: 165,
                  calories: 1028,
                  createdAt: '2022-07-10T21:14:24.216Z',
                  updatedAt: '2022-07-10T21:14:24.216Z',
                },
              },
            },
          },
        },
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
