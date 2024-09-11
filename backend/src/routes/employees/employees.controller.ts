import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Request as Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiProperty,
  ApiPropertyOptional,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { Request } from 'express';
import * as bcrypt from 'bcryptjs';
import { db } from 'src/main';

export class Employee {
  @ApiProperty()
  id: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiPropertyOptional()
  birthdate?: string;
  @ApiPropertyOptional()
  gender?: string;
  @ApiPropertyOptional()
  work?: string;
}

@Controller('employees')
@ApiTags('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return all employees',
    type: [Employee],
  })
  async getAllEmployees(): Promise<
    {
      id: string;
      email: string;
      name: string;
      surname: string;
      birthday?: string;
      gender?: string;
      work?: string;
    }[]
  > {
    const result = await this.employeesService.getAllEmployees();

    if (!result) {
      throw new HttpException('No employees found', 404);
    }
    return result;
  }

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'name', 'surname'],
      properties: {
        email: { type: 'string' },
        name: { type: 'string' },
        surname: { type: 'string' },
        birthdate: { type: 'string' },
        gender: { type: 'string' },
        work: { type: 'string' },
      },
    },
  })
  async createEmployee(
    @Body()
    data: {
      email: string;
      name: string;
      surname: string;
      password: string;
      birthdate?: string;
      gender?: string;
      work?: string;
    },
    @Req() req: Request,
  ): Promise<string> {
    const { email, name, surname, birthdate, password, gender, work } = data;

    if (req.user.role.includes('Coach'))
      throw new HttpException('Forbidden', 403);

    const employee = await db.query(
      'SELECT id FROM employees WHERE email = ?',
      [email],
    );
    if (employee[0][0]) throw new HttpException('Email already in use', 400);

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$!%*#?&_^*-])[a-zA-Z0-9@$!%#?&_^*-]{8,}$/,
      )
    )
      throw new HttpException('Invalid password', 400);

    const hash = bcrypt.hashSync(password, 10);

    return this.employeesService.createEmployee(
      email,
      hash,
      name,
      surname,
      birthdate,
      gender,
      work,
    );
  }

  @Get(':id')
  async getEmployee(@Param('id') id: string): Promise<Employee> {
    const result = this.employeesService.getEmployee(id);

    if (!result)
      throw new HttpException(`Employee with id ${id} not found`, 404);
    return result;
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: string,
    @Body()
    data: {
      email?: string;
      name?: string;
      surname?: string;
      birthdate?: string;
      gender?: string;
      work?: string;
      password?: string;
    },
    @Req() req: Request,
  ): Promise<Employee> {
    const { email, name, surname, birthdate, gender, work, password } = data;

    if (req.user.role.includes('Coach'))
      throw new HttpException('Forbidden', 403);

    const result = this.employeesService.updateEmployee(
      id,
      email,
      name,
      surname,
      birthdate,
      gender,
      work,
      password,
    );

    if (!result) {
      throw new HttpException('Employee not found', 404);
    }
    return result;
  }

  @Delete(':id')
  async deleteEmployee(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<string> {
    if (req.user.role.includes('Coach'))
      throw new HttpException('Forbidden', 403);

    const result = this.employeesService.deleteEmployee(id);
    if (!result) {
      throw new HttpException('Employee not found', 404);
    }
    return result;
  }

  // @Delete('me')
  // deleteCurrentEmployee(): string {
  //   return this.employeesService.deleteCurrentEmployee();
  // }
}
