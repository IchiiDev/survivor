import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customer.service';

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomersService) { }

    @Get()
    async getAllCustomers(): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        description: string,
        astrological_sign: string,
        phone_number: string,
        address: string
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
        phone_number?: string,
        address?: string
    }): Promise<string> {
        const {
            email,
            name,
            surname,
            birthdate,
            gender,
            description,
            astrological_sign,
            phone_number,
            address
        } = data;

        if (!email || !name || !surname) {
            throw new HttpException("Required parameters not given", 422);
        }
        return this.customerService.createCustomer(
            email,
            name,
            surname,
            birthdate,
            gender,
            description,
            astrological_sign,
            phone_number,
            address
        );
    }

    @Get(':id')
    async getCustomer(@Param('id') id: string): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        description: string,
        astrological_sign: string
        phone_number: string,
        address: string
    }> {
        const result = this.customerService.getCustomer(id);

        if (!result) {
            throw new HttpException(`Customer with id ${id} not found`, 404);
        }
        return result;
    }

    @Put(':id')
    async updateCustomer(
        @Param('id') id: string,
        @Body() data: {
            email?: string,
            name?: string,
            surname?: string,
            birthdate?: string,
            gender?: string,
            description?: string,
            astrological_sign?: string,
            phone_number?: string,
            address?: string
        }
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        description: string,
        astrological_sign: string
        phone_number: string,
        address: string
    }> {
        const {
            email,
            name,
            surname,
            birthdate,
            gender,
            description,
            astrological_sign,
            phone_number,
            address
        } = data;

        const result = this.customerService.updateCustomer(
            id,
            email,
            name,
            surname,
            birthdate,
            gender,
            description,
            astrological_sign,
            phone_number,
            address
        );


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
