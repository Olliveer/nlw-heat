import { Request, Response } from 'express';
import { GetMessagesService } from '../Services/GetMessagesService';

class GetMessagesController {
  async handle(req: Request, res: Response) {
    const { quantity } = req.params;

    const service = new GetMessagesService();

    const result = await service.execute(Number(quantity));

    return res.json(result);
  }
}

export { GetMessagesController };
