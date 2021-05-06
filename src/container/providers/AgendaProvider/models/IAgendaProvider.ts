import IScheduleAgendaQuotation from '../dtos/IScheduleAgendaQuotationDTO';
import IScheduleAgendaReminderDTO from '../dtos/IScheduleAgendaReminderDTO';

export default interface IAgendaProvider {
  scheduleMailQuotation(data: IScheduleAgendaQuotation): Promise<void>;
  scheduleMailReminder(data: IScheduleAgendaReminderDTO): Promise<void>;
}
