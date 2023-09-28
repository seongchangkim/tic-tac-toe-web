import { ArgumentMetadata } from "@nestjs/common/interfaces";
import { HttpException, ValidationPipe } from "@nestjs/common";
import { SignUpFormDTO } from "../auth/dto/sign-up-form-dto";

interface ReqParameter {
    email : string;
    password : string;
    nickname : string;
    tel : string;
}

export const validationTest = async (
    req: ReqParameter, 
    testText: string[] | string,
    cb: ((value:string) => boolean) | null
) => {
    let target: ValidationPipe = new ValidationPipe({ 
        transform: true,
        whitelist: true
    });
    const metatype: ArgumentMetadata = {
        type: 'body',
        metatype: SignUpFormDTO,
        data: ''
    }

    await target.transform(<SignUpFormDTO>req, metatype)
        .then(value => {
            throw new HttpException({
            message: "테스트 실패"
            }, 400);
        })
        .catch(err => {
            expect(
                cb === null ? 
                    err.getResponse().message :
                    err.getResponse().message.filter(cb)
                ).toEqual(testText);
        });
} 

export const validationFirstErrorMessageTest = async (
    req: ReqParameter, 
    testText: string
) => {
    let target: ValidationPipe = new ValidationPipe({ 
        transform: true,
        whitelist: true
    });
    const metatype: ArgumentMetadata = {
        type: 'body',
        metatype: SignUpFormDTO,
        data: ''
    }
  
    await target.transform(<SignUpFormDTO>req, metatype)
        .then(value => {
            throw new HttpException({
            message: "테스트 실패"
            }, 400);
        })
        .catch(err => {
            expect(err.getResponse().message[0]).toEqual(testText);
        });
} 