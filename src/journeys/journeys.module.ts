import { Module } from "@nestjs/common";
import { JourneysService } from "./journeys.service";
import { JourneysController } from "./journeys.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [JourneysController],
  components: [
    JourneysService,
  ],
})
export class JourneysModule {

}
