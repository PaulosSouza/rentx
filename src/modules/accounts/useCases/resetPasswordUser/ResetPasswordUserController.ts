import { Request, Response } from "express";
import { container } from "tsyringe";

import ResetPasswordUserUseCase from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    await resetPasswordUserUseCase.execute({
      refreshToken: String(token),
      password,
    });

    return response.send();
  }
}

export default ResetPasswordUserController;
