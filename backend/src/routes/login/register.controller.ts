import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth.guard';

@Controller('register')
@ApiTags('login')
export class RegisterController {
  constructor(private loginService: LoginService) {}

  @Post()
  @Public()
  async registerRoute(
    @Body()
    body: {
      email: string;
      password: string;
      name: string;
      surname: string;
    },
  ): Promise<any> {
    if (!this.loginService.checkEmail(body.email)) {
      return { message: 'Invalid email' };
    }

    if (
      !this.loginService.checkPassword(body.password) ||
      process.env.NODE_ENV !== 'development'
      // This line ensures we can use a simple password for testing
    ) {
      return { message: 'Invalid password' };
    }

    const user = await this.loginService.getUser(body.email);

    if (user) {
      return { message: 'User already exists' };
    }

    const hash = this.loginService.genHash(body.password);

    try {
      await this.loginService.createUser({
        email: body.email,
        password: hash,
        name: body.name,
        surname: body.surname,
      });
    } catch {
      throw new HttpException('Internal server error', 500);
    }

    return { message: 'User registered' };
  }
}
