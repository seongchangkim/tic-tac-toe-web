import { IsNotEmpty } from 'class-validator';

export class CreateGameRoomReqDTO {
    @IsNotEmpty()
    title: string;

    password: string;

    isPublic: boolean;

    userId: string;
}
