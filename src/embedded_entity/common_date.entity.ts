import { CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

export class CommonDate {
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Timestamp;

    @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    lastModifiedAt: Timestamp;
}
