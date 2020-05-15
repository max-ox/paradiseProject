import { Controller, Request, Res, Post, Get, UseGuards, UseFilters, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { FactionService } from './faction/faction.service';
import { AllExceptionsFilter } from './filters/all-exception.filter';

@Controller('api')
export class AppController {
  constructor(
      private authService: AuthService,
      private usersService: UsersService,
      private factionService: FactionService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req)  {
    return req.user;
  }

  @UseFilters(AllExceptionsFilter)
  @Post('registration')
  register(@Request() req)  {
    console.log('registration')
    return this.usersService.create(req.body.user)
  }

  @Get('factions')
  async getPosts(@Res() res) {
    const factions = await this.factionService.getFactions();
    return res.status(HttpStatus.OK).json(factions);
  }
}
