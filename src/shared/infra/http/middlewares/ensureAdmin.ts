import { NextFunction, Request, Response } from "express";

import UsersRepository from "@modules/accounts/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

export default async function ensureAdmin(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User is not admin!", 401);
  }

  return next();
}
