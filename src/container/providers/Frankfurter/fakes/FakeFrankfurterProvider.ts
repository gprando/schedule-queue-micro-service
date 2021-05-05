import logger from '@/utils/logger';
import IFrankfurterProvider from '../models/IFrankfurterProvider';

export default class FakeFrankfurterProvider implements IFrankfurterProvider {
  public async getData(from = 'BRL'): Promise<any> {
    logger.info(`get fake data from: ${from}. into fake bling`);
  }
}
