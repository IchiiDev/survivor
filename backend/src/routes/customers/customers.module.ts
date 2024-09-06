import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomersService } from './customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomersService],
})
export class CustomersModule {}
