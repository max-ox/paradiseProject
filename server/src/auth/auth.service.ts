import {Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (!user) { throw new UnauthorizedException('Invalid Username or Password'); }

        if (await user.comparePassword(pass)) {
            return user;
        } else {
            throw new UnauthorizedException('Invalid Username or Password');
        }
        return user;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
            userId: user._id
        };
    }

    vkLogin(req) {
        if (!req.user) {
            return 'No user from google'
        }

        return {
            message: 'User information from google',
            user: req.user
        }
    }
}
