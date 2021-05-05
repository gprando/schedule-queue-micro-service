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
  date: string;

  @Column()
  rates: string;

  @Column()
  AUD: string;

  @Column()
  BGN: string;

  @Column()
  CAD: string;

  @Column()
  CHF: string;

  @Column()
  CNY: string;

  @Column()
  CZK: string;

  @Column()
  DKK: string;

  @Column()
  EUR: string;

  @Column()
  GBP: string;

  @Column()
  HKD: string;

  @Column()
  HRK: string;

  @Column()
  HUF: string;

  @Column()
  IDR: string;

  @Column()
  ILS: string;

  @Column()
  INR: string;

  @Column()
  ISK: string;

  @Column()
  JPY: string;

  @Column()
  KRW: string;

  @Column()
  MXN: string;

  @Column()
  MYR: string;

  @Column()
  NOK: string;

  @Column()
  NZD: string;

  @Column()
  PHP: string;

  @Column()
  PLN: string;

  @Column()
  RON: string;

  @Column()
  RUB: string;

  @Column()
  SEK: string;

  @Column()
  SGD: string;

  @Column()
  THB: string;

  @Column()
  TRY: string;

  @Column()
  USD: string;

  @Column()
  ZAR: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
