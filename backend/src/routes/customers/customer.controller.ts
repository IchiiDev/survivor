import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  @Get()
  getAllCustomers(): string {
    return 'This action returns all customers';
  }

  @Post()
  createCustomer(): string {
    return 'This action creates a new customer';
  }

  @Get(':id')
  getCustomer(@Param('id') id: string): string {
    return `This action returns a customer with id ${id}`;
  }

  @Put(':id')
  updateCustomer(@Param('id') id: string): string {
    return `This action updates a customer with id ${id}`;
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string): string {
    return `This action deletes a customer with id ${id}`;
  }
}
