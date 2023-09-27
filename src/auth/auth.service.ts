import { Injectable } from '@nestjs/common';
import { SignUpFormDTO } from './dto/sign-up-form-dto';
import { UserRepository } from './user.repository';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository
    ){}

    async signUp({email, password, nickname, tel}: SignUpFormDTO): Promise<boolean> {
        try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const signUpUser = this.userRepository.create({
                user_id : uuidv4(), 
                email,
                password: hashedPassword,
                nickname,
                tel
            }); 
            await this.userRepository.save(signUpUser);
            return signUpUser !== undefined ? true : false;
        }catch(e) {
            return false;
        }
    }
}
