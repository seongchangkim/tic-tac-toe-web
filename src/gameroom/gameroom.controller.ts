import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GameRoomService } from './gameroom.service';
import { CreateGameRoomReqDTO } from './dto/create_game_room.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('game-room')
@UseGuards(AuthGuard())
export class GameRoomController {
    constructor(private service: GameRoomService) {}

    @Post('/')
    async createGameRoom(@Body() req: CreateGameRoomReqDTO) {
        return this.service.createGameRoom(req);
    }
}
