import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    user_id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ type: "char", length: 13 })
    tel!: string;

    @Column()
    nickname!: string;

    @CreateDateColumn({ type: "timestamp"})
    created_at?: Date;

    @UpdateDateColumn({ type: "timestamp", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at?: Date;

    @DeleteDateColumn({ type: "timestamp" })
    deleted_at?: Date;
}