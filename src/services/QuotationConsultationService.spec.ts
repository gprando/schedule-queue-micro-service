import 'reflect-metadata';

import FakeAgendaProvider from '@/container/providers/AgendaProvider/fakes/FakeAgendaProvider';
import FakeFrankfurterProvider from '@/container/providers/FrankfurterProvider/fakes/FakeFrankfurterProvider';
import FakeLogsRepository from '@/repositories/fakes/FakeLogsRepository';
import { genereteFakeDataFrank } from '@/utils/helpers';
import QuotationConsultationService from './QuotationConsultationService';

let fakeLogsRepository: FakeLogsRepository;
let fakeAgendaProvider: FakeAgendaProvider;
let fakeFrankfurterProvider: FakeFrankfurterProvider;
let quotationConsultationService: QuotationConsultationService;

describe('QuotationConsultationService', () => {
  beforeEach(() => {
    fakeLogsRepository = new FakeLogsRepository();

    fakeAgendaProvider = new FakeAgendaProvider();
    fakeFrankfurterProvider = new FakeFrankfurterProvider();

    quotationConsultationService = new QuotationConsultationService(
      fakeLogsRepository,
      fakeFrankfurterProvider,
      fakeAgendaProvider,
    );
  });

  it('should be able to list all logs', async () => {
    const data = {
      email: 'gprando55@gmail.com',
      name: 'gabriel prando',
      from_currency: 'BRL',
      send_date: new Date(),
    };
    const { amount, rates, date, base } = genereteFakeDataFrank();
    await fakeLogsRepository.create([
      {
        amount,
        ...rates,
        date,
        base,
        client_email: data.email,
        client_name: data.name,
      },
    ]);
    const response = await quotationConsultationService.execute(data);

    expect(response.base).toBe('BRL');
  });

  it('should be able to create a new log if not exist in date', async () => {
    const data = {
      email: 'gprando55@gmail.com',
      name: 'gabriel prando',
      from_currency: 'BRL',
      send_date: new Date(),
    };

    const response = await quotationConsultationService.execute(data);

    expect(response.client_email).toBe('gprando55@gmail.com');
  });
});
