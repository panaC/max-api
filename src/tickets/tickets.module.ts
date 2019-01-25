import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { ticketsProviders } from './tickets.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { authProviders } from '../auth/auth.providers';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [TicketsController],
    providers: [
        TicketsService,
        ...ticketsProviders,
        ...authProviders,
    ],
})
export class TicketsModule {

}
