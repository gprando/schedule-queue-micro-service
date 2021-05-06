import { container } from 'tsyringe';

import './providers';

import ILogsRepository from '@/repositories/ILogsRepository';
import LogsRepository from '@/infra/typeorm/repositories/LogsRepository';

import IRemindersRepository from '@/repositories/IRemindersRepository';
import RemindersRepository from '@/infra/typeorm/repositories/RemindersRepository';

container.registerSingleton<ILogsRepository>('LogsRepository', LogsRepository);

container.registerSingleton<IRemindersRepository>(
  'RemindersRepository',
  RemindersRepository,
);
