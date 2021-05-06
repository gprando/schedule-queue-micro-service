import IAgendaProvider from '@/container/providers/AgendaProvider/models/IAgendaProvider';
import logger from '@/utils/logger';
import IScheduleAgendaQuotation from '../dtos/IScheduleAgendaQuotationDTO';
import IScheduleAgendaReminderDTO from '../dtos/IScheduleAgendaReminderDTO';

class FakeAgendaProvider implements IAgendaProvider {
  public async scheduleMailQuotation(
    data: IScheduleAgendaQuotation,
  ): Promise<void> {
    logger.info(`scheduled: ${data}`);
  }

  public async scheduleMailReminder(
    data: IScheduleAgendaReminderDTO,
  ): Promise<void> {
    logger.info(`scheduled: ${data}`);
  }
}

export default FakeAgendaProvider;
