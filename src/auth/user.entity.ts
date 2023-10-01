import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
} from 'typeorm';
import { AuthRole } from './enum/auth_role';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @Column({ type: 'char', length: 13 })
    tel: string;

    @Column({ type: 'varchar', length: 10 })
    auth_role: AuthRole = AuthRole.USER;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Timestamp;

    @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    last_modified_at: Timestamp;
}
