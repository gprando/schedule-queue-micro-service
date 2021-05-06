import Reminder from '@/infra/typeorm/schemas/Reminder';

export default interface IPaginatedRemindersDTO {
  data: Reminder[];
  page: number;
  limit: number;
  total_count: number;
}
