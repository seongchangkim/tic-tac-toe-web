import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpFormDTO } from './dto/sign-up-form-dto';
import { User } from './user.entity';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository
    ){}

    async signUp(req: SignUpFormDTO): Promise<boolean> {
        try{
            const signUpUser = this.userRepository.create({user_id : uuidv4(), ...req}) 
            await this.userRepository.save(signUpUser);
            return signUpUser !== undefined ? true : false;
        }catch(e) {
            console.log(e);
            return false;
        }
    }
}
