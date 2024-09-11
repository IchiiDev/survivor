import { Injectable } from '@nestjs/common';
import { db } from 'src/main';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ResultSetHeader } from 'mysql2';

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
    return password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$!%*#?&_^*-])[a-zA-Z0-9@$!%#?&_^*-]{8,}$/,
    )
      ? true
      : false;
  }

  compareHash(hash: string, password: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  genToken(user: { id: number; role: string }): string {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
  }

  async getUser(
    email: string,
  ): Promise<{ id: number; password: string; work: string }> {
    const user = await db.query(
      'SELECT id, password, work FROM employees WHERE email=?',
      [email],
    );

    return user[0][0] ? user[0][0] : null;
  }

  genHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async createUser(user: {
    email: string;
    password: string;
    surname: string;
    name: string;
  }): Promise<void> {
    const result = await db.query(
      'INSERT INTO employees (email, password, name, surname) VALUES (?, ?, ?, ?)',
      [user.email, user.password, user.name, user.surname],
    );

    if ((<ResultSetHeader>result[0]).affectedRows !== 1)
      throw new Error('User not created');

    return;
  }
}
