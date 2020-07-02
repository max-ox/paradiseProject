import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-local';
// import { VKontakteStrategy } from 'passport-vkontakte';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

//import configuration from '../config/index';

const VKontakteStrategy = require('passport-vkontakte').Strategy

@Injectable()
export class VKStrategy extends AuthGuard('vk') {
  constructor(
    private configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    this.init();
  }
  init() {
      new VKontakteStrategy(
        {
          clientID:     this.configService.get<string>('vkAppId'),
          clientSecret: this.configService.get<string>('vkAppSecret'),
          callbackURL:  this.configService.get<string>('vkAppCallback')
        },
        async (
          accessToken: string,
          refreshToken: string,
          params: any,
          profile: any,
          done: any,
        ) => {
          console.log(params); // getting the email
          // this.userService.findOrCreate(profile).then(user => {
          //   return done(null, user);
          // })
          const user = await this.userService.findOrCreate(
            profile,
          );
          return done(null, user);
        },
    );
  }
}
// @Injectable()
// export class VKStrategy extends PassportStrategy(Strategy, 'vk') {
//     constructor(private authService: AuthService, private configService: ConfigService, private usersService: UsersService) {
//         super({
//             clientID:     configService.get<string>('vkAppId'),
//             clientSecret: configService.get<string>('vkAppSecret'),
//             callbackURL:  configService.get<string>('vkAppCallback')
//         });
//     }
//
//     async validate(accessToken, refreshToken, params, profile, done): Promise<any> {
//             console.log(params); // getting the email
//             this.usersService.findOrCreate(profile).then(user => {
//                 return done(null, user);
//             })
//     }
// }
