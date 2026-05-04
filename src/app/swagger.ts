import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "ETH Service API",
        version: "1.0.0",
        description:
          "Ethereum microservice providing RPC connectivity and health checks",
      },
    },

    apis: ["./src/**/*.ts"], // scan all TS files in src
  };

  const specs = swaggerJsdoc(options);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
}
