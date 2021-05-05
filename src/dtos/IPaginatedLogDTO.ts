import Log from '@/infra/typeorm/schemas/Log';

export default interface IPaginatedLogDTO {
  data: Log[];
  page: number;
  limit: number;
  total_count: number;
}
