import QuotationConsultationService from '@/services/QuotationConsultationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class QuotationConsultationController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, from_currency, send_date } = request.body;
    const quotationConsultationService = container.resolve(
      QuotationConsultationService,
    );

    const message = await quotationConsultationService.execute({
      name,
      email,
      from_currency,
      send_date,
    });

    return response.json(message);
  }
}

export default QuotationConsultationController;
