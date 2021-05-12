// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import createConnection from '@/infra/typeorm';
// import { Connection } from 'typeorm';

import app from '@/infra/http/app';

// let connection: Connection;

describe('Reminder controller', () => {
  beforeAll(async () => {
    await createConnection();
  });

  it('should be able to create a new reminder', async () => {
    const response = await request(app).post('/reminders').send({
      name: 'gabriel',
      email: 'prando@gmail.com',
      send_date: new Date(),
      message: 'lembrete',
    });

    expect(response.status).toBe(200);
  });
});
