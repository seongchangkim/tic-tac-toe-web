import { Module } from '@nestjs/common';
import { GameRoomGateway } from './gameroom.gateway';
import { GameRoomController } from './gameroom.controller';
import { GameRoomService } from './gameroom.service';
import { GameRoomRepository } from './gameroom.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import GameRoom from './gameroom.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, GameRoom]), AuthModule],
    providers: [GameRoomGateway, GameRoomService, GameRoomRepository],
    controllers: [GameRoomController],
})
export class GameroomModule {}
