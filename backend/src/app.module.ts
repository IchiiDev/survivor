import { Module } from '@nestjs/common';
import { LoginController } from './routes/login/login.controller';
import { TipsController } from './routes/tips/tips.controller';
import { EventsController } from './routes/events/events.controller';
import { CustomerController } from './routes/customers/customer.controller';
import { EncountersController } from './routes/encounters/encounters.controller';
import { ImagesController } from './routes/images/images.controller';
import { EmployeesController } from './routes/employees/employees.controller';

@Module({
  imports: [],
  controllers: [
    CustomerController,
    EmployeesController,
    EncountersController,
    EventsController,
    ImagesController,
    LoginController,
    TipsController,
  ],
  providers: [],
})
export class AppModule {}
