import { ICreateReminderDTO } from '@/dtos';
import { inject, injectable } from 'tsyringe';
import IAgendaProvider from '@/container/providers/AgendaProvider/models/IAgendaProvider';
import IRemindersRepository from '@/repositories/IRemindersRepository';

@injectable()
class ReminderService {
  constructor(
    @inject('RemindersRepository')
    private remindersRepository: IRemindersRepository,

    @inject('AgendaProvider')
    private agendaProvider: IAgendaProvider,
  ) {}

  async execute({
    name,
    email,
    message,
    send_date,
  }: ICreateReminderDTO): Promise<{ status: 'success' }> {
    const currentDate = new Date();

    const send_in_minutes =
      (currentDate.getTime() - new Date(send_date).getTime()) / 60000;

    await this.agendaProvider.scheduleMailReminder({
      send_in_minutes,
      email,
      name,
      message,
    });

    return { status: 'success' };
  }
}

export default ReminderService;
