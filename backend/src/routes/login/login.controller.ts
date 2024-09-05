import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('login')
@ApiTags('login')
export class LoginController {
  @Post()
  loginRoute(): any {
    return {};
  }
}
