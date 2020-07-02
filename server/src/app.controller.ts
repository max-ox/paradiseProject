import { Controller, Request, Res, Post, Get, UseGuards, UseFilters, HttpStatus, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @Get('auth/vk')
  // @UseGuards(AuthGuard('vk'))
  async vkAuth(@Request() req) {}

  @Get('auth/vk/callback')
  // @UseGuards(AuthGuard('vk'))
  vkAuthRedirect(@Request() req) {
    return this.authService.vkLogin(req)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getProfile(@Request() req, @Param('id') id)  {
    return this.usersService.findByID(id).then(user => {
      return {user}
    })
  }

  @UseFilters(AllExceptionsFilter)
  @Post('registration')
  async register(@Request() req, @Res() res)  {
    const user = await this.usersService.create(req.body.user);
    return {user}
  }

  @Get('factions')
  async getPosts(@Res() res) {
    const factions = await this.factionService.getFactions();
    return res.status(HttpStatus.OK).json(factions);
  }
}
