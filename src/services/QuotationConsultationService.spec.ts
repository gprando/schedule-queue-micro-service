import FakeFrankfurterProvider from '@/container/providers/Frankfurter/fakes/FakeFrankfurterProvider';
import FakeMailProvider from '@/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeLogsRepository from '@/repositories/fakes/FakeLogsRepository';
import QuotationConsultationService from './QuotationConsultationService';

let fakeLogsRepository: FakeLogsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeFrankfurterProvider: FakeFrankfurterProvider;
let quotationConsultationService: QuotationConsultationService;

describe('QuotationConsultationService', () => {
  beforeEach(() => {
    fakeLogsRepository = new FakeLogsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeFrankfurterProvider = new FakeFrankfurterProvider();

    quotationConsultationService = new QuotationConsultationService(
      fakeLogsRepository,
      fakeMailProvider,
      fakeFrankfurterProvider,
    );
  });

  it('should be able to list all earnings per day in a paginated way', async () => {
    await fakeLogsRepository.create([]);

    const data = {
      email: 'gprando55@gmail.com',
      name: 'gabriel prando',
      from_currency: 'BRL',
      send_date: new Date(),
    };
    const response = await quotationConsultationService.execute(data);

    expect(response.page).toBe(1);
    expect(response.limit).toBe(10);
  });
});
