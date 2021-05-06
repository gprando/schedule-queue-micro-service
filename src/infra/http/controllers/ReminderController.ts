import ReminderService from '@/services/ReminderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ReminderController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, send_date, message } = request.body;
    const reminderService = container.resolve(ReminderService);

    const data = await reminderService.execute({
      name,
      email,
      message,
      send_date,
    });

    return response.json(data);
  }
}

export default ReminderController;
