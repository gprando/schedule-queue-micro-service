import { container } from 'tsyringe';

import IAgendaProvider from './models/IAgendaProvider';
import AgendaProvider from './implementations/AgendaProvider';

container.registerSingleton<IAgendaProvider>('AgendaProvider', AgendaProvider);
