import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [],
})
export class EventsModule {}
