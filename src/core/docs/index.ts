import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./spec";

export const setSwagger = (app: any) =>
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
