import { Module } from '@nestjs/common';
import { LoginController } from './routes/login/login.controller';
import { TipsController } from './routes/tips/tips.controller';
import { EventsController } from './routes/events/events.controller';
import { CustomerController } from './routes/customers/customer.controller';
import { EncountersController } from './routes/encounters/encounters.controller';
import { ImagesController } from './routes/images/images.controller';
import { EmployeesController } from './routes/employees/employees.controller';
import { CustomersService } from './routes/customers/customer.service';
import { EmployeesService } from './routes/employees/employees.service';
import { EncountersService } from './routes/encounters/encounters.service';
import { EventsService } from './routes/events/events.service';
import { TipsService } from './routes/tips/tips.service';

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
    providers: [
        CustomersService,
        EmployeesService,
        EncountersService,
        EventsService,
        TipsService,
    ],
})
export class AppModule { }
