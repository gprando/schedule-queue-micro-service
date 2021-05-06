import { container } from 'tsyringe';

import IFrankfurterProvider from './models/IFrankfurterProvider';

import FrankfurterProvider from './implementations/FrankfurterProvider';

container.registerSingleton<IFrankfurterProvider>(
  'FrankfurterProvider',
  FrankfurterProvider,
);
