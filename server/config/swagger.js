const swaggerJSDoc = require('swagger-jsdoc');


const swaggerOptions = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Note Taking API',
            version: '1.0.0',
            description: 'API for notes and categories with authentication',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
            apis: ['.src/routes/*.js'],
        },
    });