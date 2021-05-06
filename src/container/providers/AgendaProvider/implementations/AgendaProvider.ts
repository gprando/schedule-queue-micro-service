import { Agenda, Job } from 'agenda';
import { inject, injectable } from 'tsyringe';

import IAgendaProvider from '@/container/providers/AgendaProvider/models/IAgendaProvider';
import { hasKey } from '@/utils/helpers';
import IMailProvider from '../../MailProvider/models/IMailProvider';
import ISendMailDTO from '../../MailProvider/dtos/ISendMailDTO';
import IScheduleAgendaQuotation from '../dtos/IScheduleAgendaQuotationDTO';
import IScheduleAgendaReminderDTO from '../dtos/IScheduleAgendaReminderDTO';

@injectable()
class AgendaProvider implements IAgendaProvider {
  private agenda: Agenda;

  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {
    const connectionString = 'mongodb://127.0.0.1/schedule-agenda';
    this.agenda = new Agenda({
      db: {
        address: connectionString,
        collection: 'schedule_collection',
      },
      processEvery: '30 seconds',
    });

    this.agenda.define(
      'send-email-quotation',
      { priority: 10, concurrency: 10 },
      async (job: Job<IScheduleAgendaQuotation>) => {
        const email = job.attrs.data?.email;
        const name = job.attrs.data?.name;
        const log = job.attrs.data?.log;
        const send = job.attrs.data?.send_in_minutes;

        const html = `${
          log
            ? Object.keys(log)
                .map(l => {
                  if (hasKey(log, l)) {
                    return `<p>${l}: ${log[l]}</p>`;
                  }
                  return '';
                })
                .join(' ')
            : ''
        }`;

        const subject = `olá ${name} email agendado a ${send} minutos atrás`;
        await this.mailProvider.sendMail({
          to: { email, name },
          html,
          subject,
        } as ISendMailDTO);
      },
    );

    this.agenda.define(
      'send-email-reminder',
      { priority: 10, concurrency: 10 },
      async (job: Job<IScheduleAgendaReminderDTO>) => {
        const email = job.attrs.data?.email;
        const name = job.attrs.data?.name;
        const message = job.attrs.data?.message;
        const send = job.attrs.data?.send_in_minutes;

        const html = message;

        const subject = `olá ${name} email agendado a ${send} minutos atrás`;
        await this.mailProvider.sendMail({
          to: { email, name },
          html,
          subject,
        } as ISendMailDTO);
      },
    );
  }

  public async scheduleMailQuotation({
    send_in_minutes,
    name,
    email,
    log,
  }: IScheduleAgendaQuotation): Promise<void> {
    await this.agenda.start();
    await this.agenda.schedule(
      `in ${send_in_minutes} minutes`,
      'send-email-quotation',
      {
        name,
        email,
        log,
        send_in_minutes,
      },
    );
  }

  public async scheduleMailReminder({
    send_in_minutes,
    name,
    email,
    message,
  }: IScheduleAgendaReminderDTO): Promise<void> {
    await this.agenda.start();
    await this.agenda.schedule(
      `in ${send_in_minutes} minutes`,
      'send-email-reminder',
      {
        name,
        email,
        message,
        send_in_minutes,
      },
    );
  }
}

export default AgendaProvider;
