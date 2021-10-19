import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type IPayload = {
  sub: string;
};

export function isAuthenticated(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      errorCode: 'token.invalid',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    req.user_id = sub;

    return _next();
  } catch (error) {
    return res.status(401).json({
      errorCode: 'token.expired',
    });
  }
}
