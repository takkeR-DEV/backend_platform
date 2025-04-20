import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todos API',
            version: '1.0.0',
            description: 'Документация API для задач',
        },
        servers: [
            {
                url: 'https://backend-platform-9cer.onrender.com',
                description: 'Production (Render)',
            },
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            }
        ]
    },
    apis: ['./routes/*.js'], // путь к js-файлам с аннотациями
};

export const swaggerSpec = swaggerJSDoc(options);