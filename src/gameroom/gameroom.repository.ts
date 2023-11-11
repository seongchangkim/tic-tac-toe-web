import { Injectable } from '@nestjs/common';
import GameRoom from './gameroom.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GameRoomRepository extends Repository<GameRoom> {
    constructor(private dataSource: DataSource) {
        super(GameRoom, dataSource.manager);
    }
}
