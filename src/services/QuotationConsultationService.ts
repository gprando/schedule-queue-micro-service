import { ICreateLogDTO } from '@/dtos';
import ILogsRepository from '@/repositories/ILogsRepository';
import IFrankfurterProvider from '@/container/providers/FrankfurterProvider/models/IFrankfurterProvider';
import { inject, injectable } from 'tsyringe';
import { formatDate } from '@/utils/helpers';
import IAgendaProvider from '@/container/providers/AgendaProvider/models/IAgendaProvider';
import Log from '@/infra/typeorm/schemas/Log';

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

    @inject('FrankfurterProvider')
    private frankfurterProvider: IFrankfurterProvider,

    @inject('AgendaProvider')
    private agendaProvider: IAgendaProvider,
  ) {}

  async execute({
    name,
    email,
    from_currency,
    send_date,
  }: IRequestData): Promise<Log> {
    const currentDate = new Date();

    const stringCurrentDate = formatDate(currentDate);

    const existsLog = await this.logsRepository.findByDate(stringCurrentDate);

    let log: ICreateLogDTO | Log | undefined = existsLog;

    if (!existsLog) {
      const data = await this.frankfurterProvider.getData(from_currency);

      const { amount, base, date, rates } = data;
      log = {
        amount,
        base,
        date,
        ...rates,
        client_name: name,
        client_email: email,
      } as ICreateLogDTO;
      await this.logsRepository.create([log]);
    }

    const send_in_minutes =
      (currentDate.getTime() - new Date(send_date).getTime()) / 60000;
    await this.agendaProvider.scheduleMailQuotation({
      send_in_minutes,
      email,
      name,
      log: log as Log,
    });

    return log as Log;
  }
}

export default QuotationConsultationService;
