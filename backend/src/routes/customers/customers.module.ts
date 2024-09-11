import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomersService } from './customer.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [],
  controllers: [CustomerController, PaymentsController],
  providers: [CustomersService],
})
export class CustomersModule {}
