import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import AppError from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import getConnectionTypeOrm from "../typeorm";
import router from "./routes";

import "@shared/container";

const app = express();

getConnectionTypeOrm();
app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log("Server is running"));
