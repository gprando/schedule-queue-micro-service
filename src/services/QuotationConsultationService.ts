import { IPaginatedLogDTO } from '@/dtos';
import ILogsRepository from '@/repositories/ILogsRepository';
import IFrankfurterProvider from '@/container/providers/Frankfurter/models/IFrankfurterProvider';
import IMailProvider from '@/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import { formatDate } from '@/utils/helpers';
// import logger from '@/utils/logger';

type IRequestData = {
  name: string;
  email: string;
  from_currency: string;
  send_date: Date;
};

@injectable()
class QuotationConsultationService {
  constructor(
    @inject('LogsRepository')
    private logsRepository: ILogsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('FrankfurterProvider')
    private frankfurterProvider: IFrankfurterProvider,
  ) {}

  async execute({
    name,
    email,
    from_currency,
    send_date,
  }: IRequestData): Promise<IPaginatedLogDTO> {
    const currentDate = new Date();

    const stringCurrentDate = formatDate(currentDate);

    const existsLog = await this.logsRepository.findByDate(stringCurrentDate);

    if (!existsLog) {
      const data = await this.frankfurterProvider.getData(from_currency);

      const { amount, base, date, rates } = data;
      const log = {
        amount,
        base,
        date,
        ...rates,
        client_name: name,
        client_email: email,
      };
      await this.logsRepository.create([log]);
    }

    const result = await this.logsRepository.findAllPaginated({
      page: 1,
      limit: 10,
    });

    return result;
  }
}

export default QuotationConsultationService;
