import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('employees')
@ApiTags('employees')
export class EmployeesController {
  @Get()
  getAllEmployees(): string {
    return 'This action returns all employees';
  }

  @Post()
  createEmployee(): string {
    return 'This action creates a new employee';
  }

  @Get(':id')
  getEmployee(@Param('id') id: string): string {
    return `This action returns an employee with id ${id}`;
  }

  @Put(':id')
  updateEmployee(@Param('id') id: string): string {
    return `This action updates an employee with id ${id}`;
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string): string {
    return `This action deletes an employee with id ${id}`;
  }

  @Get('me')
  getCurrentEmployee(): string {
    return 'This action returns the current employee';
  }

  @Put('me')
  updateCurrentEmployee(): string {
    return 'This action updates the current employee';
  }

  // @Delete('me')
  // deleteCurrentEmployee(): string {
  //   return 'This action deletes the current employee';
  // }
}
