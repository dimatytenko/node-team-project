module.exports = {
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['email', 'password', 'name'],
        properties: {
          id: {
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
            description: `User's password`,
          },
          name: {
            type: 'string',
            description: `User's name`,
          },
          height: {
            type: 'number',
            description: `User's height in cm`,
            default: null,
          },
          age: {
            type: 'number',
            description: `User's age`,
            default: null,
          },
          weight_current: {
            type: 'number',
            description: `User's current weight in kg`,
            default: null,
          },
          weight_desired: {
            type: 'number',
            description: `User's desired weight in kg`,
            default: null,
          },
          blood: {
            type: 'number',
            description: `User's blood type`,
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
          weight_current: 70,
          weight_desired: 60,
          blood: 3,
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
