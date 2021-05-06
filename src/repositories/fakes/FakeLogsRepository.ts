import { IPaginationDTO, ICreateLogDTO, IPaginatedLogDTO } from '@/dtos';
import Log from '@/infra/typeorm/schemas/Log';
import { ObjectID } from 'mongodb';
import ILogsRepository from '../ILogsRepository';

export default class FakeLogRepository implements ILogsRepository {
  private logs: Log[] = [];

  public async findById(id: string): Promise<Log | undefined> {
    if (!ObjectID.isValid(id)) {
      return undefined;
    }
    const log = this.logs.find(b => String(b.id) === id);

    return log;
  }

  public async findByDate(date: string): Promise<Log | undefined> {
    const log = this.logs.find(b => b.date === date);

    return log;
  }

  public async findAll(): Promise<Log[] | undefined> {
    return this.logs;
  }

  public async findAllPaginated({
    page = 1,
    limit = 10,
  }: IPaginationDTO): Promise<IPaginatedLogDTO> {
    const skippedItems = (page - 1) * limit;

    const total_count = this.logs.length;
    const arrayLogs: Log[] = [];

    let i = skippedItems;

    const limitLoop =
      skippedItems + limit < total_count
        ? skippedItems + limit
        : total_count - 1;

    if (i === 0 && limitLoop === 0 && this.logs[0]) {
      arrayLogs.push(this.logs[0]);
    }
    // eslint-disable-next-line no-plusplus
    for (i; i < limitLoop; i++) {
      arrayLogs.push(this.logs[i]);
    }

    return {
      total_count,
      page,
      limit,
      data: arrayLogs,
    };
  }

  public async create(data: ICreateLogDTO[]): Promise<Log[]> {
    const createdLog = data.map(log => {
      const newLog = new Log();

      Object.assign(newLog, log);

      this.logs.push(newLog);
      return newLog;
    });

    return createdLog;
  }
}
