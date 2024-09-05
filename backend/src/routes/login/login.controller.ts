import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { Public } from 'src/auth.guard';

@Controller('login')
@ApiTags('login')
export class LoginController {
  constructor(private loginService: LoginService) {}
  @Post()
  @Public()
  async loginRoute(
    @Body() body: { email: string; password: string },
  ): Promise<any> {
    if (body.email === '' || !this.loginService.checkEmail(body.email))
      throw new HttpException('Invalid email', 400);

    if (!this.loginService.checkPassword(body.password))
      throw new HttpException('Invalid password', 400);

    const user = await this.loginService.getUser(body.email);
    if (!user) throw new HttpException('User not found', 404);

    if (!this.loginService.compareHash(user.password, body.password))
      throw new HttpException('Invalid password', 400);

    return { token: this.loginService.genToken({ id: user.id }) };
  }
}
