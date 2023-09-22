import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches, MinLength } from "class-validator";

export class SignUpFormDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    password: string;

    @IsNotEmpty()
    nickname: string;

    @IsPhoneNumber("KR")
    @IsNotEmpty()
    tel:string;
}