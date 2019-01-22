import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { ticketsProviders } from './tickets.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from 'dist/src/auth/auth.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [TicketsController],
    providers: [
        TicketsService,
        ...ticketsProviders,
    ],
})
export class TicketsModule {

}
