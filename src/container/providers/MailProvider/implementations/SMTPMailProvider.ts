import { createTransport, Transporter } from 'nodemailer';
import config from '@/config';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class SMTPMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: false,
      name: config.mailName,
      auth: {
        user: config.mailUser,
        pass: config.mailPassword,
      },
    });
    this.client = transporter;
  }

  public async sendMail({
    to,
    from,
    subject,
    html,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
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
  }
}
