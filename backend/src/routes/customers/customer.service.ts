import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
    getAllCustomers(): string {
        return 'This service returns all customers';
    }

    createCustomer(): string {
        return 'This service creates a new customers';
    }

    getCustomer(id: number): string {
        return `This service returns a customer with id ${id}`;
    }

    updateCustomer(id: number): string {
        return `This service updates a customer with id ${id}`;
    }

    deleteCustomer(id: number): string {
        return `This service deletes a customer with id ${id}`;
    }
}
