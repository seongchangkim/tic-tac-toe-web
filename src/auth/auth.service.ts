import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from './user.repository';
import { SignUpForm } from './dto/sign_up_form';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(private repository: UserRepository) {}

    async signUp(req: SignUpForm): Promise<boolean> {
        try {
            const signUpUser: User = await this.repository.create({
                user_id: uuidv4(),
                ...req,
            });

            await this.repository.save(signUpUser);
            return signUpUser !== undefined ? true : false;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }
}
