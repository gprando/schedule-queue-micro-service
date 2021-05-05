import { container } from 'tsyringe';

import './providers';

import ILogsRepository from '@/repositories/ILogsRepository';
import LogsRepository from '@/infra/typeorm/repositories/LogsRepository';

container.registerSingleton<ILogsRepository>('LogsRepository', LogsRepository);
