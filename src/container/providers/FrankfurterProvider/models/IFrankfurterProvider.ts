export interface IResponseFrank {
  amount: number;
  base: string;
  date: string;
  rates: {
    AUD: number;
    BGN: number;
    BRL: number;
    CAD: number;
    EUR: number;
    CHF: number;
    CNY: number;
    CZK: number;
    DKK: number;
    GBP: number;
    HKD: number;
    HRK: number;
    HUF: number;
    IDR: number;
    ILS: number;
    INR: number;
    ISK: number;
    JPY: number;
    KRW: number;
    MXN: number;
    MYR: number;
    NOK: number;
    NZD: number;
    PHP: number;
    PLN: number;
    RON: number;
    RUB: number;
    SEK: number;
    SGD: number;
    THB: number;
    TRY: number;
    USD: number;
    ZAR: number;
  };
}

export default interface IFrankfurterProvider {
  getData(from?: string): Promise<IResponseFrank>;
}
