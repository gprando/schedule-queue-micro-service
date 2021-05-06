import 'reflect-metadata';

import FakeAgendaProvider from '@/container/providers/AgendaProvider/fakes/FakeAgendaProvider';
import FakeRemindersRepository from '@/repositories/fakes/FakeRemindersRepository';
import ReminderService from './ReminderService';

let fakeRemindersRepository: FakeRemindersRepository;
let fakeAgendaProvider: FakeAgendaProvider;
let reminderService: ReminderService;

describe('reminderService', () => {
  beforeEach(() => {
    fakeRemindersRepository = new FakeRemindersRepository();

    fakeAgendaProvider = new FakeAgendaProvider();

    reminderService = new ReminderService(
      fakeRemindersRepository,
      fakeAgendaProvider,
    );
  });

  it('should be able to schedule one reminder', async () => {
    const data = {
      email: 'gprando55@gmail.com',
      name: 'gabriel prando',
      message: 'lembrete XX',
      send_date: new Date(),
    };

    const response = await reminderService.execute(data);

    expect(response.status).toBe('success');
  });
});
