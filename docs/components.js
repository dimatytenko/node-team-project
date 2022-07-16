module.exports = {
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          _id: {
            type: 'string',
            description: 'Backend-generated unique identifier',
          },
          email: {
            type: 'string',
            format: 'email',
            description: `User's email`,
          },
          password: {
            type: 'string',
            minLength: 8,
            maxLength: 32,
            description: `User's password`,
          },
          name: {
            type: 'string',
            minLength: 3,
            maxLength: 60,
            description: `User's name`,
          },
          height: {
            type: 'number',
            min: 100,
            max: 250,
            description: `User's height in cm`,
            default: null,
          },
          age: {
            type: 'number',
            min: 18,
            max: 100,
            description: `User's age`,
            default: null,
          },
          weight_current: {
            type: 'number',
            min: 20,
            max: 500,
            description: `User's current weight in kg`,
            default: null,
          },
          weight_desired: {
            type: 'number',
            min: 20,
            max: 500,
            description: `User's desired weight in kg`,
            default: null,
          },
          blood: {
            type: 'number',
            oneOf: [1, 2, 3, 4],
            description: `User's blood type`,
            default: null,
          },
          daily_rate: {
            type: 'number',
            description: `User's daily kcal rate`,
            default: null,
          },
        },
        example: {
          id: '62c19dfee6a4441aa2dd8f8f',
          email: 'user1@gmail.com',
          password: 'yeui78TH6',
          name: 'Archi',
          height: 170,
          age: 30,
          weight_current: 65,
          weight_desired: 60,
          blood: 1,
          daily_rate: 1353,
        },
      },
      Product: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'Backend-generated unique identifier',
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
        example: {
          title: {
            en: 'Apple compote',
            ua: 'Яблучний компот',
          },
          _id: '5d51694902b2373622ff5f81',
          categories: ['soft drinks'],
          weight: 100,
          calories: 85,
          groupBloodNotAllowed: [null, false, false, false, false],
        },
      },
      Day: {
        type: 'object',
        required: ['user_id'],
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
        example: {
          _id: '62cf095f91439be12dbcfd0d',
          date: '2022-07-13T00:00:00.000+00:00',
          user_id: '62cbd980c581d682492169d4',
          daily_rate: 1353,
          left: 1118,
          consumed: 235,
          percentage_of_normal: 17,
        },
      },
      Diary: {
        type: 'object',
        required: ['product_id', 'user_id', 'day_id'],
        description: 'Diary entry scheme when adding / removing a product',
        properties: {
          _id: {
            type: 'string',
            description: 'Backend-generated unique identifier',
          },
          product_id: {
            type: 'string',
            description: `Product's id`,
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
        example: {
          _id: '62cdc1db53c22adb0216fede',
          product_id: '5d51694802b2373622ff553b',
          day_id: '62cdc0d853c22adb0216feb1',
          user_id: '62ca8eac11edcafd252ae639',
          weight: 165,
          calories: 1028,
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        name: 'authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
    },
  },
};
