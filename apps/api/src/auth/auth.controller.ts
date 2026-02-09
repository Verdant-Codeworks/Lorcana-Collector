import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; displayName?: string },
  ) {
    return this.authService.register(body.email, body.password, body.displayName);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Initiates Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: any, @Res() res: any) {
    const { accessToken } = await this.authService.oauthLogin(req.user);
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:5173');
    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  }

  @Get('discord')
  @UseGuards(DiscordAuthGuard)
  discordLogin() {
    // Initiates Discord OAuth flow
  }

  @Get('discord/callback')
  @UseGuards(DiscordAuthGuard)
  async discordCallback(@Req() req: any, @Res() res: any) {
    const { accessToken } = await this.authService.oauthLogin(req.user);
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:5173');
    res.redirect(`${frontendUrl}/auth/callback?token=${accessToken}`);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: UserEntity) {
    return this.authService.toAuthUser(user);
  }
}
