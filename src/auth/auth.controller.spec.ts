import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { typeORMConfig } from '../configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { ArgumentMetadata, HttpException, ValidationPipe } from '@nestjs/common';
import { SignUpFormDTO } from './dto/sign-up-form-dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [AuthService, UserRepository],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // [회원가입] 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "testtest.com",
      password : "test123",
      nickname : "",
      tel : "0100000000"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("email must be an email") > -1 ||value.indexOf("password must be longer than or equal to 8 characters") > -1 || value.indexOf("tel must be longer than or equal to 13 characters") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email must be an email",
          "password must be longer than or equal to 8 characters",
          "nickname should not be empty",
          "tel must be longer than or equal to 13 characters"
        ]);
      });
  });

  // [회원가입] 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 이메일 형식이 아니고 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "testtest.com",
      password : "test123",
      nickname : "",
      tel : "0000000"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("email must be an email") > -1 || value.indexOf("password must be longer than or equal to 8 characters") > -1 || value.indexOf("tel must be a valid phone number") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email must be an email",
          "password must be longer than or equal to 8 characters",
          "nickname should not be empty",
          "tel must be a valid phone number"
        ]);
      });
  });

  // [회원가입] 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 비밀번호 글자 수가 8자 미만이고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "",
      password : "test123",
      nickname : "",
      tel : "0100000000"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("password must be longer than or equal to 8 characters") > -1 || value.indexOf("tel must be longer than or equal to 13 characters") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email should not be empty",
          "password must be longer than or equal to 8 characters",
          "nickname should not be empty",
          "tel must be longer than or equal to 13 characters"
        ]);
      });
  });
  
  // [회원가입] 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 비밀번호 글자 수가 8자 미만이고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "",
      password : "test123",
      nickname : "",
      tel : "0000000"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("password must be longer than or equal to 8 characters") > -1 || value.indexOf("tel must be a valid phone number") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email should not be empty",
          "password must be longer than or equal to 8 characters",
          "nickname should not be empty",
          "tel must be a valid phone number"
        ]);
      });
  });

  // [회원가입] 이메일 형식이 아니고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 이메일 형식이 아니고 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "testtest.com",
      password : "",
      nickname : "",
      tel : "0100000000"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("email must be an email") > -1 || value.indexOf("tel must be longer than or equal to 13 characters") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email must be an email",
          "password should not be empty",
          "nickname should not be empty",
          "tel must be longer than or equal to 13 characters"
        ]);
      });
  });

  // [회원가입] 이메일 형식이 아니고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 이메일 형식이 아니고 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "testtest.com",
      password : "",
      nickname : "",
      tel : "0000000"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("email must be an email") > -1 || value.indexOf("tel must be a valid phone number") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email must be an email",
          "password should not be empty",
          "nickname should not be empty",
          "tel must be a valid phone number"
        ]);
      });
  });
  
  // [회원가입] 이메일 형식이 아니고 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 이메일 형식이 아니고 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "testtest.com",
      password : "test123",
      nickname : "",
      tel : ""
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("email must be an email") > -1 || value.indexOf("password must be longer than or equal to 8 characters") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email must be an email",
          "password must be longer than or equal to 8 characters",
          "nickname should not be empty",
          "tel should not be empty"
        ]);
      });
  });

  // [회원가입] 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 전화번호 글자 수가 13자 미만이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "",
      password : "",
      nickname : "",
      tel : "0101111111"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("tel must be longer than or equal to 13 characters") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email should not be empty",
          "password should not be empty",
          "nickname should not be empty",
          "tel must be longer than or equal to 13 characters"
        ]);
      });
  });

  // [회원가입] 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 무효한 전화번호 형식이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "",
      password : "",
      nickname : "",
      tel : "0000000"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("tel must be a valid phone number") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email should not be empty",
          "password should not be empty",
          "nickname should not be empty",
          "tel must be a valid phone number"
        ]);
      });
  });

  // [회원가입] 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 비밀번호 8자 미만이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "",
      password : "test123",
      nickname : "",
      tel : ""
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("password must be longer than or equal to 8 characters") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email should not be empty",
          "password must be longer than or equal to 8 characters",
          "nickname should not be empty",
          "tel should not be empty"
        ]);
      });
  });

  // [회원가입] 유효하지 않는 이메일 형식이고 나머지 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 유효하지 않는 이메일 형식이고 나머지 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "testtest.com",
      password : "",
      nickname : "",
      tel : ""
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => (value.indexOf("email must be an email") > -1) || value.indexOf("not be empty") > -1)).toEqual([
          "email must be an email",
          "password should not be empty",
          "nickname should not be empty",
          "tel should not be empty"
        ]);
      });
  });

  // [회원가입] 모든 입력값들이 전부 빈 값인지 테스트 케이스
  it('[회원가입] - 모든 입력값들이 전부 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "",
      password : "",
      nickname : "",
      tel : ""
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message.filter((value:string) => value.indexOf("not be empty") > -1)).toEqual([
          "email should not be empty",
          "password should not be empty",
          "nickname should not be empty",
          "tel should not be empty"
        ]);
      });
  });

  // [회원가입] 전화번호가 빈 값인지 실패 테스트 케이스
  it('[회원가입] - 전화번호가 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "test@test.com",
      password : "test1234",
      nickname : "test1",
      tel : ""
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message[0]).toEqual(
          "tel should not be empty", 
        );
      });
  });

  // [회원가입] 전화번호 형식인지 실패 테스트 케이스
  it('[회원가입] - 전화번호 형식임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "test@test.com",
      password : "test1234",
      nickname : "test1",
      tel : "1111111"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message[1]).toEqual(
          "tel must be a valid phone number"
        );
      });
  });
  
  // [회원가입] 전화번호 글자 수가 13자인지 실패 테스트 케이스
  it('[회원가입] - 전화번호 글자 수가 13자 아님.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "test@test.com",
      password : "test1234",
      nickname : "test1",
      tel : "0100000000"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message[0]).toEqual(
          "tel must be longer than or equal to 13 characters"
        );
      });
  });
    
  // [회원가입] 비밀번호 글자 수가 8자 이상인지 실패 테스트 케이스
  it('[회원가입] - 비밀번호 글자 수가 8자 미만임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "test@test.com",
      password : "test12",
      nickname : "test1",
      tel : "010-1111-1111"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message).toEqual([
          "password must be longer than or equal to 8 characters", 
        ]);
      });
  });
  
  // [회원가입] 비밀번호가 빈 값인지 실패 테스트 케이스
  it('[회원가입] - 비밀번호가 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "test@test.com",
      password : "",
      nickname : "test1",
      tel : "010-1111-1111"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message[0]).toEqual(
          "password should not be empty", 
        );
      });
  });

  // [회원가입] : 닉네임이 빈 값인지 실패 테스트 케이스
  it('[회원가입] - 닉네임이 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "test@test.com",
      password : "test1234",
      nickname : "",
      tel : "010-1111-1111"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message).toEqual([
          "nickname should not be empty", 
        ]);
      });
  });

  // [회원가입] 이메일이 빈 값인지 실패 테스트 케이스
  it('[회원가입] - 이메일이 빈 값임.', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : '',
      password : 'test1234',
      nickname : 'test1',
      tel : '010-1111-1111'
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message[0]).toEqual("email should not be empty");
      });
  });

  // [회원가입] 회원가입 이메일 형식 유효성 실패 테스트 케이스
  it('[회원가입] - 입력한 이메일이 이메일 형식이 아님', async () => {
    let target: ValidationPipe = new ValidationPipe({ 
      transform: true,
      whitelist: true
    });
    const metatype: ArgumentMetadata = {
      type: 'body',
      metatype: SignUpFormDTO,
      data: ''
    }

    await target.transform(<SignUpFormDTO>{
      email : "test1test.com",
      password : "test1234",
      nickname : "test1",
      tel : "010-1111-1111"
    }, metatype)
      .then(value => {
        throw new HttpException({
          message: "테스트 실패"
        }, 400);
      })
      .catch(err => {
        expect(err.getResponse().message).toEqual(["email must be an email"]);
      });
  });
});
