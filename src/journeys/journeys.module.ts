import { Module } from "@nestjs/common";
import { JourneysService } from "./journeys.service";
import { JourneysController } from "./journeys.controller";

@Module({
  controllers: [JourneysController],
  components: [
    JourneysService,
  ],
})
export class JourneysModule {

}
