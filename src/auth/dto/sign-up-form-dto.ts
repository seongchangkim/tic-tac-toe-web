import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpFormDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    nickname: string;

    @IsPhoneNumber("KR")
    @MinLength(13)
    @IsNotEmpty()
    tel:string;
}