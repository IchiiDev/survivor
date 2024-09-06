import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { RegisterController } from './register.controller';

@Module({
  imports: [],
  controllers: [LoginController, RegisterController],
  providers: [LoginService],
})
export class LoginModule {}
