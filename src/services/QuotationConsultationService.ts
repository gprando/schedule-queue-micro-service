import { IPaginatedLogDTO } from '@/dtos';
import ILogsRepository from '@/repositories/ILogsRepository';
import IFrankfurterProvider from '@/container/providers/Frankfurter/models/IFrankfurterProvider';
import IMailProvider from '@/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import logger from '@/utils/logger';

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
    const data = await this.frankfurterProvider.getData(from_currency);
    logger.info({
      name,
      email,
      from_currency,
      send_date,
      data,
    });

    // ver se já tem o resultado no dia, se tiver não salva, se tiver salva
    // depois agendar email pro maluco

    const result = await this.logsRepository.findAllPaginated({
      page: 1,
      limit: 1,
    });

    return result;
  }
}

export default QuotationConsultationService;
