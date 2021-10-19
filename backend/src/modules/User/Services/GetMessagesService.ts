import prisma from '../../../shared/prisma';

class GetMessagesService {
  async execute(quantity: number) {
    const messages = await prisma.message.findMany({
      take: quantity,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,
      },
    });

    return messages;
  }
}

export { GetMessagesService };
