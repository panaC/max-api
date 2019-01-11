import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { JourneysModule } from './journeys/journeys.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TicketsModule,
    JourneysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
