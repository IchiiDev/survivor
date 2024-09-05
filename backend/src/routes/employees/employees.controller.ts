import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';

@Controller('employees')
@ApiTags('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Get()
    getAllEmployees(): string {
        return this.employeesService.getAllEmployees();
    }

    @Post()
    createEmployee(): string {
        return this.employeesService.createEmployee();
    }

    @Get(':id')
    getEmployee(@Param('id') id: string): string {
        return this.employeesService.getEmployee(+id);
    }

    @Put(':id')
    updateEmployee(@Param('id') id: string): string {
        return this.employeesService.updateEmployee(+id);
    }

    @Delete(':id')
    deleteEmployee(@Param('id') id: string): string {
        return this.employeesService.deleteEmployee(+id);
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
