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
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiProperty,
  ApiPropertyOptional,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomersService } from './customer.service';
import { Request } from 'express';

export class Customer {
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
  description?: string;
  @ApiPropertyOptional()
  astrological_sign?: string;
  @ApiPropertyOptional()
  phone?: string;
  @ApiPropertyOptional()
  address?: string;
}

@Controller('customers')
@ApiTags('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomersService) {}

  @Get()
  async getAllCustomers(@Req() req: Request): Promise<
    {
      id: string;
      email: string;
      name: string;
      surname: string;
      birthdate: string;
      gender: string;
      description: string;
      astrological_sign: string;
      phone: string;
      address: string;
    }[]
  > {
    if (req.user.role.includes('Coach'))
      throw new HttpException('Forbidden', 403);

    const result = await this.customerService.getAllCustomers();

    if (!result) {
      throw new HttpException('No customers found', 404);
    }
    return result;
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'name', 'surname'],
      properties: {
        email: {
          type: 'string',
          example: 'example.mail@company.org',
        },
        name: {
          type: 'string',
          example: 'John',
        },
        surname: {
          type: 'string',
          example: 'Doe',
        },
        birthdate: {
          type: 'string',
          example: '1990-01-01',
        },
        gender: {
          type: 'string',
          example: 'male',
        },
        description: {
          type: 'string',
          example: 'Customer description',
        },
        astrological_sign: {
          type: 'string',
          example: 'Leo',
        },
        phone: {
          type: 'string',
          example: '123456789',
        },
        address: {
          type: 'string',
          example: '221B Baker Street, London, UK',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created.',
  })
  @ApiBadRequestResponse()
  async createCustomer(
    @Body()
    data: {
      email: string;
      name: string;
      surname: string;
      birthdate?: string;
      gender?: string;
      description?: string;
      astrological_sign?: string;
      phone?: string;
      address?: string;
      image?: string;
    },
  ): Promise<string> {
    const {
      email,
      name,
      surname,
      birthdate,
      gender,
      description,
      astrological_sign,
      phone,
      address,
      image,
    } = data;

    return this.customerService.createCustomer(
      email,
      name,
      surname,
      birthdate,
      gender,
      description,
      astrological_sign,
      phone,
      address,
      image,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Customer ID to fetch',
  })
  @ApiFoundResponse({
    description: 'The customer has been successfully found.',
    type: Customer,
  })
  async getCustomer(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Customer> {
    const result = await this.customerService.getCustomer(
      id,
      req.query.includePaymentsHistory == '' ||
        req.query.includePaymentsHistory == 'true',
    );

    if (
      req.user.role.includes('Coach') &&
      (!result || parseInt(result.coach_id) !== req.user.id)
    )
      throw new HttpException('Forbidden', 403);

    if (!result)
      throw new HttpException(`Customer with id ${id} not found`, 404);
    return result;
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Customer ID to update',
  })
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'name', 'surname'],
      properties: {
        email: {
          type: 'string',
          example: 'example.mail@company.org',
        },
        name: {
          type: 'string',
          example: 'John',
        },
        surname: {
          type: 'string',
          example: 'Doe',
        },
        birthdate: {
          type: 'string',
          example: '1990-01-01',
        },
        gender: {
          type: 'string',
          example: 'male',
        },
        description: {
          type: 'string',
          example: 'Customer description',
        },
        astrological_sign: {
          type: 'string',
          example: 'Leo',
        },
        phone: {
          type: 'string',
          example: '123456789',
        },
        address: {
          type: 'string',
          example: '221B Baker Street, London, UK',
        },
      },
    },
  })
  async updateCustomer(
    @Param('id') id: string,
    @Body()
    data: {
      email: string;
      name: string;
      surname: string;
      birthdate?: string;
      gender?: string;
      description?: string;
      astrological_sign?: string;
      phone?: string;
      address?: string;
      image?: string;
      coach_id?: string;
    },
    @Req() req: Request,
  ): Promise<{
    id: string;
    email: string;
    name: string;
    surname: string;
    birthdate?: string;
    gender?: string;
    description?: string;
    astrological_sign?: string;
    phone?: string;
    address?: string;
    image?: string;
    coach_id?: string;
  }> {
    const {
      email,
      name,
      surname,
      birthdate,
      gender,
      description,
      astrological_sign,
      phone,
      address,
      image,
      coach_id,
    } = data;

    if (req.user.role.includes('Coach'))
      throw new HttpException('Forbidden', 403);

    const result = this.customerService.updateCustomer(
      id,
      email,
      name,
      surname,
      birthdate,
      gender,
      description,
      astrological_sign,
      phone,
      address,
      image,
      coach_id,
    );

    if (!result) {
      throw new HttpException(`Customer with id ${id} not found`, 404);
    }
    return result;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Customer ID to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The customer has been successfully deleted.',
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async deleteCustomer(@Param('id') id: string): Promise<string> {
    const result = this.customerService.deleteCustomer(id);
    if (!result) {
      throw new HttpException('Customer not found', 404);
    }
    return result;
  }
}
