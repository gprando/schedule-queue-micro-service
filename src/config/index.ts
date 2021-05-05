const parsedEnv = process.env;

// Define log levels type (silent + Winston default npm)
type LogLevel =
  | 'silent'
  | 'error'
  | 'warn'
  | 'info'
  | 'http'
  | 'verbose'
  | 'debug'
  | 'silly';

type MailDriver = 'ethereal' | 'smtp';

interface Config {
  morganLogger: boolean;
  morganBodyLogger: boolean;
  expressDevLogger: boolean;
  loggerLevel: LogLevel;
  frankfurterURL: string;
  port: number;

  mail_driver: MailDriver;

  mail_defaults: {
    from: {
      email: string;
      name: string;
    };
  };

  mailHost: string;
  mailPort: number;
  mailName: string;
  mailUser: string;
  mailPassword: string;
}

const config: Config = {
  morganLogger: (parsedEnv.MORGAN_LOGGER || false) as boolean,
  morganBodyLogger: (parsedEnv.MORGAN_BODY_LOGGER || true) as boolean,
  expressDevLogger: (parsedEnv.EXPRESS_DEV_LOGGER || true) as boolean,
  loggerLevel: (parsedEnv.LOGGER_LEVEL || 'debug') as LogLevel,
  port: (parsedEnv.PORT || 3000) as number,
  frankfurterURL: parsedEnv.FRANKFURTER_URL as string,

  mail_driver: (parsedEnv.MAIL_DRIVER || 'ethereal') as MailDriver,

  mail_defaults: {
    from: {
      email: 'prando@dominio.com.br',
      name: 'Gabriel Prando',
    },
  },

  mailHost: parsedEnv.MAIL_HOST as string,
  mailPort: (parsedEnv.MAIL_PORT || 587) as number,
  mailName: parsedEnv.MAIL_NAME as string,
  mailUser: parsedEnv.MAIL_USER as string,
  mailPassword: parsedEnv.MAIL_PASS as string,
};

export default config;
