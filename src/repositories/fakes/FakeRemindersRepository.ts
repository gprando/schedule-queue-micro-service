import {
  IPaginationDTO,
  IPaginatedReminderDTO,
  ICreateReminderDTO,
} from '@/dtos';
import Reminder from '@/infra/typeorm/schemas/Reminder';
import { ObjectID } from 'mongodb';
import IRemindersRepository from '../IRemindersRepository';

export default class FakeRemindersRepository implements IRemindersRepository {
  private reminders: Reminder[] = [];

  public async findById(id: string): Promise<Reminder | undefined> {
    if (!ObjectID.isValid(id)) {
      return undefined;
    }
    return this.reminders.find(b => String(b.id) === id);
  }

  public async findByDate(date: string): Promise<Reminder | undefined> {
    return this.reminders.find(b => b.created_at === new Date(date));
  }

  public async findAll(): Promise<Reminder[] | undefined> {
    return this.reminders;
  }

  public async findAllPaginated({
    page = 1,
    limit = 10,
  }: IPaginationDTO): Promise<IPaginatedReminderDTO> {
    const skippedItems = (page - 1) * limit;

    const total_count = this.reminders.length;
    const arrayReminders: Reminder[] = [];

    let i = skippedItems;

    const limitLoop =
      skippedItems + limit < total_count
        ? skippedItems + limit
        : total_count - 1;

    if (i === 0 && limitLoop === 0 && this.reminders[0]) {
      arrayReminders.push(this.reminders[0]);
    }
    // eslint-disable-next-line no-plusplus
    for (i; i < limitLoop; i++) {
      arrayReminders.push(this.reminders[i]);
    }

    return {
      total_count,
      page,
      limit,
      data: arrayReminders,
    };
  }

  public async create(data: ICreateReminderDTO[]): Promise<Reminder[]> {
    const createdLog = data.map(d => {
      const newReminder = new Reminder();

      Object.assign(newReminder, d);

      this.reminders.push(newReminder);
      return newReminder;
    });

    return createdLog;
  }
}
