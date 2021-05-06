import fetch from 'node-fetch';
import config from '@/config';
import IFrankfurterProvider, {
  IResponseFrank,
} from '../models/IFrankfurterProvider';

export default class FrankfurterProvider implements IFrankfurterProvider {
  public async getData(from = 'BRL'): Promise<IResponseFrank> {
    const result = await fetch(`${config.frankfurterURL}/latest?from=${from}`, {
      method: 'GET',
    });

    return result.json();
  }
}
