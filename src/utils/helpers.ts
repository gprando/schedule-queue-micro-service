import { IResponseFrank } from '@/container/providers/Frankfurter/models/IFrankfurterProvider';

/* eslint-disable import/prefer-default-export */
export const formatDate = (d: Date): string => {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(
    2,
    '0',
  )}-${`${d.getDate()}`.padStart(2, '0')}`;
};

export const getRandomArbitrary = (max: number, min = 0.1): number => {
  return Math.random() * (max - min) + min;
};

export const genereteFakeDataFrank = (): IResponseFrank => {
  return {
    amount: 1,
    base: 'BRL',
    date: formatDate(new Date()),
    rates: {
      AUD: getRandomArbitrary(0.3),
      BGN: getRandomArbitrary(0.3),
      CAD: getRandomArbitrary(0.3),
      BRL: 1,
      CHF: getRandomArbitrary(4),
      CNY: getRandomArbitrary(4),
      CZK: getRandomArbitrary(4),
      DKK: getRandomArbitrary(4),
      EUR: getRandomArbitrary(0.3),
      GBP: getRandomArbitrary(0.3),
      HKD: getRandomArbitrary(2),
      HRK: getRandomArbitrary(2),
      HUF: getRandomArbitrary(60),
      IDR: getRandomArbitrary(3000),
      ILS: getRandomArbitrary(4),
      INR: getRandomArbitrary(18),
      ISK: getRandomArbitrary(18),
      JPY: getRandomArbitrary(18),
      KRW: getRandomArbitrary(300),
      MXN: getRandomArbitrary(4),
      MYR: getRandomArbitrary(0.3),
      NOK: getRandomArbitrary(4),
      NZD: getRandomArbitrary(0.3),
      PHP: getRandomArbitrary(10),
      PLN: getRandomArbitrary(0.9),
      RON: getRandomArbitrary(0.9),
      RUB: getRandomArbitrary(14),
      SEK: getRandomArbitrary(4),
      SGD: getRandomArbitrary(0.9),
      THB: getRandomArbitrary(4),
      TRY: getRandomArbitrary(4),
      USD: getRandomArbitrary(0.9),
      ZAR: getRandomArbitrary(4),
    },
  };
};
