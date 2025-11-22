const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();  // load .env variables

const doc = {
    info: {
        title: 'Users Api',
        description: 'Users Api'
    },
    //host: process.env.HOST || 'localhost:3000',
    //schemes: ['http']
    host: https://cse-341-project2-ojkw.onrender.com,
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
