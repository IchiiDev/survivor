import { Body, Controller, HttpException, Put, Get, Request as Req } from "@nestjs/common";
import { Request } from "express";
import { MeService } from './me.service';
import * as bcrypt from 'bcryptjs';

@Controller('me')
export class MeController {
    constructor(private readonly meService: MeService) { }

    @Get()
    async getCurrentEmployee(@Req() req: Request): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string
    }> {
        const result = this.meService.getCurrentEmployee(String(req.user.id));

        if (!result)
            throw new HttpException("Current employee not found", 404);
        return result;
    }

    @Put()
    async updateCurrentEmployee(
        @Req() req: Request,
        @Body() data: {
            email?: string,
            name?: string,
            password?: string,
            surname?: string,
            birthdate?: string,
            gender?: string,
            work?: string
        }
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string
    }> {
        const { email, password, name, surname, birthdate, gender, work } = data;

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$!%*#?&_^*-])[a-zA-Z0-9@$!%#?&_^*-]{8,}$/))
            throw new HttpException("Password isn't strong enough", 422);
        const newPassword = bcrypt.hashSync(password, 10);
        const result = this.meService.updateCurrentEmployee(
            String(req.user.id),
            email,
            newPassword,
            name,
            surname,
            birthdate,
            gender,
            work
        );

        if (!result)
            throw new HttpException("Current employee not found", 404);
        return result;
    }
}
