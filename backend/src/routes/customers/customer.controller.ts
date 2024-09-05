import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customer.service';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomersService) { }

    @Get()
    async getAllCustomers(): Promise<{
        id: number,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string,
    }[]> {
        const result = await this.customerService.getAllCustomers();

        if (!result) {
            throw new HttpException("No customers found", 404);
        }
        return result;
    }

    @Post()
    async createCustomer(@Body() data: {
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string,
    }): Promise<string> {
        const { email, name, surname, birthdate, gender, description, astrological_sign } = data;
        return this.customerService.createCustomer(
            email,
            name,
            surname,
            birthdate,
            gender,
            description,
            astrological_sign,
        );
    }

    @Get(':id')
    async getCustomer(@Param('id') id: string): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string
    }> {
        const result = this.customerService.getCustomer(id);

        if (!result) {
            throw new HttpException(`Customer with id ${id} not found`, 404);
            return;
        }
        return result;
    }

    @Put(':id')
    async updateCustomer(
        @Param('id') id: string,
        @Body() data: {
            email: string,
            name: string,
            surname: string,
            birthdate?: string,
            gender?: string,
            description?: string,
            astrological_sign?: string
        }
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string
    }> {
        const { email, name, surname, birthdate, gender, description, astrological_sign } = data;
        const result = this.customerService.updateCustomer(id, email, name, surname, birthdate, gender, description, astrological_sign);


        if (!result) {
            throw new HttpException("Customer not found", 404);
        }
        return result;
    }

    @Delete(':id')
    async deleteCustomer(@Param('id') id: string): Promise<string> {
        const result = this.customerService.deleteCustomer(id);
        if (!result) {
            throw new HttpException("Customer not found", 404);
        }
        return result;
    }
}
