import { container } from 'tsyringe';
import config from '@/config';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SMTPMailProvider from './implementations/SMTPMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  smtp: container.resolve(SMTPMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[config.mail_driver],
);
