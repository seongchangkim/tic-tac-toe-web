import { CommonDate } from '../embedded_entity/common_date.entity';
import { User } from '../auth/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class GameRoom extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    gameRoomId: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    joinUserId: string;

    @Column()
    roomMangerUserId: string;

    @Column()
    isPublic: boolean = true;

    @ManyToOne(() => User, (user) => user.gamerooms)
    @JoinColumn({ name: 'userId' })
    user: Promise<User>;

    @Column(() => CommonDate)
    date: CommonDate;
}
