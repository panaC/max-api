import { Controller, Get, Query } from "@nestjs/common";
import { Ijourney } from "./interfaces/journey.interface";
import { JourneysService } from "./journeys.service";

@Controller('journeys')
export class JourneysController {
    constructor(private readonly journeysService: JourneysService) { }

    @Get()
    async findAll(@Query('origin') origin: string,
                  @Query('destination') destination: string,
                  @Query('date') date: string): Promise<Ijourney[]> {
        if (origin && destination) {
            return this.journeysService.findAll(origin, destination);
        }
        return Promise.reject();
    }
}
