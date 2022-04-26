import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";

import AppError from "@shared/errors/AppError";
import getConnectionRedis from "@shared/infra/redis";

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const redis = await getConnectionRedis();

  const limiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: "rateLimiter",
    points: 15,
    duration: 5,
  });

  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
