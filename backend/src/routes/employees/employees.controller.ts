import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request as Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { Request } from 'express';
import * as bcrypt from 'bcryptjs';

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
        birthdate: string,
        gender: string,
        work: string,
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
        password: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    }): Promise<string> {
        const { email, password, name, surname, birthdate, gender, work } = data;

        if (!email || !password || !name || !surname)
            throw new HttpException("Required parameters not given", 422);
        return this.employeesService.createEmployee(
            email,
            password,
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
        birthdate: string,
        gender: string,
        work: string
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
            email?: string,
            name?: string,
            surname?: string,
            birthdate?: string,
            gender?: string,
            work?: string,
            password?: string
        }
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string,
        password: string
    }> {
        const { email, name, surname, birthdate, gender, work, password } = data;

        const result = this.employeesService.updateEmployee(id, email, name, surname, birthdate, gender, work, password);

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
    async getCurrentEmployee(@Req() req: Request): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string
    }> {
        const result = this.employeesService.getCurrentEmployee(String(req.user.id));

        if (!result) {
            throw new HttpException("Current employee not found", 404);
        }
        return result;
    }

    @Put('me')
    async updateCurrentEmployee(
        @Req() req: Request,
        @Body() data: {
            email: string,
            password: string,
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
        birthdate: string,
        gender: string,
        work: string
    }> {
        const { email, password, name, surname, birthdate, gender, work } = data;

        if (!email || !password || !name || !surname)
            throw new HttpException("Required parameters not given", 422);
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$!%*#?&_^*-])[a-zA-Z0-9@$!%#?&_^*-]{8,}$/))
            throw new HttpException("Password isn't strong enough", 422);
        const newPassword = bcrypt.hashSync(password, 10);

        const result = this.employeesService.updateCurrentEmployee(String(req.user.id), email, newPassword, name, surname, birthdate, gender, work);

        if (!result) {
            throw new HttpException("Current employee not found", 404);
        }
        return result;
    }

    // @Delete('me')
    // deleteCurrentEmployee(): string {
    //   return this.employeesService.deleteCurrentEmployee();
    // }
}
