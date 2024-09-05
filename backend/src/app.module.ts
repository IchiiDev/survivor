import { Module } from '@nestjs/common';
import { CustomersModule } from './routes/customers/customers.module';
import { EmployeesModule } from './routes/employees/employees.module';
import { EncountersModule } from './routes/encounters/encounters.module';
import { EventsModule } from './routes/events/events.module';
import { LoginModule } from './routes/login/login.module';
import { ImagesModule } from './routes/images/images.module';
import { TipsModule } from './routes/tips/tips.module';

@Module({
    imports: [
        CustomersModule,
        EmployeesModule,
        EncountersModule,
        EventsModule,
        ImagesModule,
        LoginModule,
        TipsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
