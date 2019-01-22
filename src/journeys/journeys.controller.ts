import { Controller, Get, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { Ijourney } from './interfaces/journey.interface';
import { JourneysService } from './journeys.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('journeys')
export class JourneysController {
    constructor(private readonly journeysService: JourneysService) { }

    @Get()
    @UseGuards(AuthGuard())
    async findAll(@Query('origin') origin: string,
                  @Query('destination') destination: string,
                  @Query('date') date: string): Promise<Ijourney[]> {

        if (origin && destination) {
            try {
                return await this.journeysService.findAll(origin, destination, date);
            } catch (err) {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            throw new HttpException('Bad origin or destination', HttpStatus.BAD_REQUEST);
        }
    }
}
