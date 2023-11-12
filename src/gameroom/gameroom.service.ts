import { Injectable } from '@nestjs/common';
import { GameRoomRepository } from './gameroom.repository';
import { CreateGameRoomReqDTO } from './dto/create_game_room.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class GameRoomService {
    constructor(
        private repository: GameRoomRepository,
        private userRepository: UserRepository,
    ) {}

    async createGameRoom({
        title,
        password,
        isPublic,
        userId,
    }: CreateGameRoomReqDTO) {
        const user = this.userRepository.findOneBy({
            userId,
        });

        const createdGameRoom = await this.repository.create({
            gameRoomId: uuidv4(),
            title,
            password,
            isPublic,
            roomMangerUserId: userId,
        });

        createdGameRoom.user = user;

        await this.repository.save(createdGameRoom);

        return {
            isSuccess: true,
            gameRoomId: createdGameRoom.gameRoomId,
        };
    }
}
