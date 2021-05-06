import Log from '@/infra/typeorm/schemas/Log';
import { ICreateLogDTO, IPaginatedLogDTO } from '@/dtos';
import IPaginationDTO from '@/dtos/IPaginationDTO';

export default interface ILogsRepository {
  findAll(): Promise<Log[] | undefined>;
  findAllPaginated({ limit, page }: IPaginationDTO): Promise<IPaginatedLogDTO>;
  findById(id: string): Promise<Log | undefined>;
  findByDate(date: string): Promise<Log | undefined>;
  create(data: ICreateLogDTO[]): Promise<Log[]>;
}
