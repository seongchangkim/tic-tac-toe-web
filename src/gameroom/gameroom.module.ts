import { Module } from '@nestjs/common';
import { GameroomGateway } from './gameroom.gateway';
import { GameroomController } from './gameroom.controller';
import { GameroomService } from './gameroom.service';

@Module({
    providers: [GameroomGateway, GameroomService],
    controllers: [GameroomController],
})
export class GameroomModule {}
