import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class AdminRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.manager);
    }
}
