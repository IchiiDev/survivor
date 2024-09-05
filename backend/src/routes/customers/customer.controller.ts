import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customer.service';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomersService) { }

    @Get()
    getAllCustomers(): string {
        return this.customerService.getAllCustomers();
    }

    @Post()
    createCustomer(): string {
        return this.customerService.createCustomer();
    }

    @Get(':id')
    getCustomer(@Param('id') id: string): string {
        return this.customerService.getCustomer(+id);
    }

    @Put(':id')
    updateCustomer(@Param('id') id: string): string {
        return this.customerService.updateCustomer(+id);
    }

    @Delete(':id')
    deleteCustomer(@Param('id') id: string): string {
        return this.customerService.deleteCustomer(+id);
    }
}
