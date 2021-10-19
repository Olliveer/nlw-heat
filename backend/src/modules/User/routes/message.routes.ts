import { Router } from 'express';
import { isAuthenticated } from '../../../shared/http/middleware/isAuthenticated';
import { CreateMessageController } from '../Controllers/CreateMessageController';
import { GetMessagesController } from '../Controllers/GetMessagesController';

const messagesRoutes = Router();

const createMessageController = new CreateMessageController();
const getMessagesController = new GetMessagesController();

messagesRoutes.get('/:quantity', getMessagesController.handle);

messagesRoutes.post('/', isAuthenticated, createMessageController.handle);

export { messagesRoutes };
