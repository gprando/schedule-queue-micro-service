import { genereteFakeDataFrank } from '@/utils/helpers';
import logger from '@/utils/logger';
import IFrankfurterProvider, {
  IResponseFrank,
} from '../models/IFrankfurterProvider';

export default class FakeFrankfurterProvider implements IFrankfurterProvider {
  public async getData(from = 'BRL'): Promise<IResponseFrank> {
    logger.info(from);
    return genereteFakeDataFrank();
  }
}
