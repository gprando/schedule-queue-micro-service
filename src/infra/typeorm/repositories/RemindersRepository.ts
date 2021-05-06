import {
  IPaginationDTO,
  IPaginatedReminderDTO,
  ICreateReminderDTO,
} from '@/dtos';
import Reminder from '@/infra/typeorm/schemas/Reminder';
import { ObjectID } from 'mongodb';
import IRemindersRepository from '@/repositories/IRemindersRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';

export default class FakeLogRepository implements IRemindersRepository {
  private ormRepository: MongoRepository<Reminder>;

  constructor() {
    this.ormRepository = getMongoRepository(Reminder);
  }

  public async findById(id: string): Promise<Reminder | undefined> {
    if (!ObjectID.isValid(id)) {
      return undefined;
    }
    return this.ormRepository.findOne(id);
  }

  public async findByDate(date: string): Promise<Reminder | undefined> {
    return this.ormRepository.findOne({
      where: { created_at: new Date(date) },
    });
  }

  public async findAll(): Promise<Reminder[] | undefined> {
    return this.ormRepository.find();
  }

  public async findAllPaginated({
    page = 1,
    limit = 10,
  }: IPaginationDTO): Promise<IPaginatedReminderDTO> {
    const skippedItems = (page - 1) * limit;

    const [reminders, total_count] = await this.ormRepository.findAndCount({
      skip: skippedItems,
      take: limit,
    });

    return {
      total_count,
      page,
      limit,
      data: reminders,
    };
  }

  public async create(data: ICreateReminderDTO[]): Promise<Reminder[]> {
    const arrayReminders = data.map(d => {
      return this.ormRepository.create(d);
    });

    await this.ormRepository.save(arrayReminders);

    return arrayReminders;
  }
}
