import { Router } from 'express';
import { isAuthenticated } from '../../../shared/http/middleware/isAuthenticated';
import { ProfileUserController } from '../Controllers/ProfileUserController';

const userRoutes = Router();

const profileUserController = new ProfileUserController();

userRoutes.get('/profile', isAuthenticated, profileUserController.handle);

export { userRoutes };
