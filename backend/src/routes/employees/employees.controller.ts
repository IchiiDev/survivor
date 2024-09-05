import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';

@Controller('employees')
@ApiTags('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Get()
    async getAllEmployees(): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthday?: string,
        gender?: string,
        work?: string
    }[]> {
        const result = await this.employeesService.getAllEmployees();

        if (!result) {
            throw new HttpException("No employees found", 404);
        }
        return result;
    }

    @Post()
    async createEmployee(@Body() data: {
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    }): Promise<string> {
        const { email, name, surname, birthdate, gender, work } = data;
        return this.employeesService.createEmployee(
            email,
            name,
            surname,
            birthdate,
            gender,
            work
        );
    }

    @Get(':id')
    async getEmployee(@Param('id') id: string): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    }> {
        const result = this.employeesService.getEmployee(id);

        if (!result) {
            throw new HttpException(`Employee with id ${id} not found`, 404);
        }
        return result;
    }

    @Put(':id')
    async updateEmployee(
        @Param('id') id: string,
        @Body() data: {
            email: string,
            name: string,
            surname: string,
            birthdate?: string,
            gender?: string,
            work?: string
        }
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    }> {
        const { email, name, surname, birthdate, gender, work } = data;
        const result = this.employeesService.updateEmployee(id, email, name, surname, birthdate, gender, work);

        if (!result) {
            throw new HttpException("Employee not found", 404);
        }
        return result;
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: string): Promise<string> {
        const result = this.employeesService.deleteEmployee(id);
        if (!result) {
            throw new HttpException("Employee not found", 404);
        }
        return result;
    }

    @Get('me')
    getCurrentEmployee(): string {
        return this.employeesService.getCurrentEmployee();
    }

    @Put('me')
    updateCurrentEmployee(): string {
        return this.employeesService.updateCurrentEmployee();
    }

    // @Delete('me')
    // deleteCurrentEmployee(): string {
    //   return this.employeesService.deleteCurrentEmployee();
    // }
}
