import { Router } from 'express';
import { AuthenticateUserController } from '../Controllers/AuthenticateUserController';

const sessionRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

sessionRoutes.post('/', authenticateUserController.handle);

export { sessionRoutes };
