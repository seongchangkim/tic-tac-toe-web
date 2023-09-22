import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";


@Injectable()
export class UserRepository extends Repository<User> {
    constructor(@InjectRepository(User) private dataSource: DataSource){
        super(User, dataSource.manager);
    }   
}