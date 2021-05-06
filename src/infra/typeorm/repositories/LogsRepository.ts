import { ICreateLogDTO, IPaginatedLogDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';
import ILogsRepository from '@/repositories/ILogsRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import AppError from '@/errors/AppError';
import Log from '../schemas/Log';

export default class LogsRepository implements ILogsRepository {
  private ormRepository: MongoRepository<Log>;

  constructor() {
    this.ormRepository = getMongoRepository(Log);
  }

  public async findById(id: string): Promise<Log | undefined> {
    if (!ObjectID.isValid(id)) {
      throw new AppError('Object id inválid');
    }

    return this.ormRepository.findOne(id);
  }

  public async findByDate(date: string): Promise<Log | undefined> {
    return this.ormRepository.findOne({ where: { date } });
  }

  public async findAll(): Promise<Log[] | undefined> {
    return this.ormRepository.find();
  }

  public async findAllPaginated({
    page = 1,
    limit = 10,
  }: IPaginationDTO): Promise<IPaginatedLogDTO> {
    const skippedItems = (page - 1) * limit;

    const total_count = await this.ormRepository.count();
    const logs = await this.ormRepository.find({
      skip: skippedItems,
      take: limit,
    });

    return {
      total_count,
      page,
      limit,
      data: logs,
    };
  }

  public async create(data: ICreateLogDTO[]): Promise<Log[]> {
    const arrayLog = data.map(d => {
      return this.ormRepository.create(d);
    });

    await this.ormRepository.save(arrayLog);

    return arrayLog;
  }
}
