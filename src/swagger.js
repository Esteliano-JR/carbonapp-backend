const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CarbonApp API",
      version: "1.0.0",
      description: "Documentação da API do CarbonApp",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL do backend local
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Pega anotações das rotas
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;


