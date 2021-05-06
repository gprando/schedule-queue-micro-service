import Log from '@/infra/typeorm/schemas/Log';

export default interface IScheduleAgendaQuotation {
  send_in_minutes?: number;
  log?: Log;
  email?: string;
  name?: string;
}
