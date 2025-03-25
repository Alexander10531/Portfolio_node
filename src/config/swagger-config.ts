import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Portafolio de node',
      version: '1.0.0',
      description: 'Documentación de mi API usando OpenAPI',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },

  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
