import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthRole } from './enum/auth_role.enum';
import { SocialLoginType } from './enum/social_login_type.enum';
// import GameRoom from '../gameroom/gameroom.entity';
import { CommonDate } from '../embedded_entity/common_date.entity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @Column({ type: 'char', length: 13, nullable: true })
    tel: string;

    @Column({ type: 'varchar', length: 10 })
    authRole: AuthRole = AuthRole.USER;

    @Column({ type: 'varchar', length: 10 })
    socialLoginType: SocialLoginType = SocialLoginType.NONE;

    @Column({ type: 'varchar', nullable: true })
    profileUrl: string;

    // @OneToMany(() => GameRoom, (gameRoom) => gameRoom.user, {
    //     cascade: true,
    //     onDelete: 'CASCADE',
    // })
    // gamerooms: Promise<GameRoom[]>;

    @Column(() => CommonDate)
    date: CommonDate;
}
