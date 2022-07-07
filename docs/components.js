module.exports = {
  components: {
    schemas: {
      User: {
        type: 'object',
        required: ['email', 'password'],
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
        },
        example: {
          id: '62c19dfee6a4441aa2dd8f8f',
          email: 'user1@gmail.com',
          password: 'yeui78TH6',
          name: 'Archi',
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
