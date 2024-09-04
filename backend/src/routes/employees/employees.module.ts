import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [],
})
export class EmployeesModule {}
