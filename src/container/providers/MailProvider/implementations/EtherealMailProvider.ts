import nodemailer, { Transporter } from 'nodemailer';

import logger from '@/utils/logger';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    html,
  }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Gabriel Prando',
        address: from?.email || 'prando@dominio.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html,
    });

    logger.info('Message sent: %s', message.messageId);
    logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
