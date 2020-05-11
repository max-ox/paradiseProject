import { Controller, Request, Post, Get, UseGuards, UseFilters } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AllExceptionsFilter } from './filters/all-exception.filter';

@Controller('api')
export class AppController {
  constructor(
      private authService: AuthService,
      private usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req)  {
    return req.user;
  }

  @UseFilters(AllExceptionsFilter)
  @Post('register')
  register(@Request() req)  {
    console.log('register url')
    return this.usersService.create(req.body)
  }
}
