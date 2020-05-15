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
            // const tokenPayload: JwtPayload = { userId: user.id };
            // const token = this.jwtService.sign(tokenPayload);
            // return ({ token, userId: user.id, status: LoginStatus.success });
        } else {
            throw new UnauthorizedException('Invalid Username or Password');
        }
        // await user.comparePassword(pass, function(err, isMatch) {
        //     console.log('comparePassword', isMatch)
        //     if(isMatch) {
        //         return user;
        //     } else {
        //         throw new UnauthorizedException()
        //     }
        // });
        return user;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
