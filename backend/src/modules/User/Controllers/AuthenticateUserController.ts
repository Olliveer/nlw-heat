import { Request, Response } from 'express';
import AppError from '../../../shared/errors/AppError';
import { AuthenticateUserService } from '../Services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    const service = new AuthenticateUserService();

    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (error) {
      throw new AppError(`Oooops! something happend: ${error.message}`);
    }
  }
}

export { AuthenticateUserController };
