import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomersService } from './customer.service';

@Module({
    controllers: [CustomerController],
    providers: [CustomersService]
})
export class CustomerModule { }
