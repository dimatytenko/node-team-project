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
            description: `Product categories`,
            type: 'array',
            items: {
              type: 'string',
            },
          },
          weight: {
            type: 'number',
            description: `Product weight in grams`,
          },
          title: {
            type: 'object',
            properties: {
              en: { type: 'string' },
              ua: { type: 'string' },
            },
            description: `Product name`,
          },
          calories: {
            type: 'number',
            description: `Product calories per 100 grams`,
          },
          groupBloodNotAllowed: {
            type: 'array',
            items: { type: 'mixed' },
            description: `Boolean if this product is recommended for a particular blood type`,
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
      Day: {},
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
