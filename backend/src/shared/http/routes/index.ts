import { Router } from 'express';
import { messagesRoutes } from '../../../modules/User/routes/message.routes';
import { sessionRoutes } from '../../../modules/User/routes/session.routes';
import { userRoutes } from '../../../modules/User/routes/user.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/sessions', sessionRoutes);
router.use('/messages', messagesRoutes);

export { router };
