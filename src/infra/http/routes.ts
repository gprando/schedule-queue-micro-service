import { Router } from 'express';
import QuotationConsultationController from './controllers/QuotationConsultationController';

const router = Router();

const quotationConsultationController = new QuotationConsultationController();

router.post('/quotation', quotationConsultationController.create);

export default router;
