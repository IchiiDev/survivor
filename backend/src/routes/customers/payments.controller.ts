import { Controller, Get, HttpException } from '@nestjs/common';
import { db } from 'src/main';

@Controller('payments')
export class PaymentsController {
  @Get()
  async getAllPayments(): Promise<
    {
      id: string;
      customer_id: string;
      date: string;
      amount: string;
      status: string;
    }[]
  > {
    const result = await db.query('SELECT * FROM payments');

    if (!result) {
      throw new HttpException('No payments found', 404);
    }
    return <any>result[0];
  }
}
