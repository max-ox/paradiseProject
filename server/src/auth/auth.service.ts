import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, _id: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
