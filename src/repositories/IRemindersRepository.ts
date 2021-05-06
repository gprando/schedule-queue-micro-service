import { ICreateReminderDTO, IPaginatedReminderDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import Reminder from '@/infra/typeorm/schemas/Reminder';

export default interface IRemindersRepository {
  findAll(): Promise<Reminder[] | undefined>;
  findAllPaginated({
    limit,
    page,
  }: IPaginationDTO): Promise<IPaginatedReminderDTO>;
  findById(id: string): Promise<Reminder | undefined>;
  findByDate(date: string): Promise<Reminder | undefined>;
  create(data: ICreateReminderDTO[]): Promise<Reminder[]>;
}
