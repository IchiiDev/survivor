import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeesService {
    getAllEmployees(): string {
        return 'This service returns all employees';
    }

    createEmployee(): string {
        return 'This service creates a new employee';
    }

    getEmployee(id: number): string {
        return `This service returns an employee with id ${id}`;
    }

    updateEmployee(id: number): string {
        return `This service updates an employee with id ${id}`;
    }

    deleteEmployee(id: number): string {
        return `This service deletes an employee with id ${id}`;
    }

    getCurrentEmployee(): string {
        return 'This service returns the current employee';
    }

    updateCurrentEmployee(): string {
        return 'This service updates the current employee';
    }

    // deleteCurrentEmployee(): string {
    //  return 'This service deletes the current employee';
    // }
}
