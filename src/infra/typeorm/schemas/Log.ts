import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('logs')
export default class Log {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('int')
  amount: number;

  @Column()
  base: string;

  @Column()
  client_name: string;

  @Column()
  client_email: string;

  @Column()
  date: string;

  @Column()
  AUD: number;

  @Column()
  BGN: number;

  @Column()
  CAD: number;

  @Column()
  CHF: number;

  @Column()
  CNY: number;

  @Column()
  CZK: number;

  @Column()
  DKK: number;

  @Column()
  EUR: number;

  @Column()
  GBP: number;

  @Column()
  HKD: number;

  @Column()
  HRK: number;

  @Column()
  HUF: number;

  @Column()
  IDR: number;

  @Column()
  ILS: number;

  @Column()
  INR: number;

  @Column()
  ISK: number;

  @Column()
  JPY: number;

  @Column()
  KRW: number;

  @Column()
  MXN: number;

  @Column()
  MYR: number;

  @Column()
  NOK: number;

  @Column()
  NZD: number;

  @Column()
  PHP: number;

  @Column()
  PLN: number;

  @Column()
  RON: number;

  @Column()
  RUB: number;

  @Column()
  SEK: number;

  @Column()
  SGD: number;

  @Column()
  THB: number;

  @Column()
  TRY: number;

  @Column()
  USD: number;

  @Column()
  ZAR: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
