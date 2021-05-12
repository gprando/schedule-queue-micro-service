import { Router } from 'express';
import QuotationConsultationController from './controllers/QuotationConsultationController';
import ReminderController from './controllers/ReminderController';

const router = Router();

const quotationConsultationController = new QuotationConsultationController();
const reminderController = new ReminderController();

router.post('/quotation', quotationConsultationController.create);
router.post('/reminders', reminderController.create);

export default router;
