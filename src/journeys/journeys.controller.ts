import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Ijourney } from './interfaces/journey.interface';
import { JourneysService } from './journeys.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('journeys')
@UseGuards(AuthGuard())
export class JourneysController {
    constructor(private readonly journeysService: JourneysService) { }

    @Get()
    async findAll(@Query('origin') origin: string,
                  @Query('destination') destination: string,
                  @Query('date') date: string): Promise<Ijourney[]> {
        if (origin && destination) {
            return this.journeysService.findAll(origin, destination, date);
        }
        return Promise.reject();
    }
}
