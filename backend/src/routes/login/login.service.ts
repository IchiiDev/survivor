import { Injectable } from '@nestjs/common';
import { db } from 'src/main';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  checkEmail(email: string): boolean {
    return email.match(
      /^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/,
    )
      ? true
      : false;
  }

  checkPassword(password: string): boolean {
    // TODO: Update this to check for a valid password
    return password.length >= 0 ? true : false;
  }

  compareHash(hash: string, password: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  genToken(user: { id: number }): string {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
  }

  async getUser(email: string): Promise<{ id: number; password: string }> {
    const user = await db.query(
      'SELECT id, password FROM employees WHERE email=?',
      [email],
    );

    return user[0][0].id ? user[0][0] : null;
  }
}
