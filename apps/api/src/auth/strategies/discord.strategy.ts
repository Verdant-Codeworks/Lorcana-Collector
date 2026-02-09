import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID', 'not-configured'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET', 'not-configured'),
      callbackURL: configService.get('DISCORD_CALLBACK_URL', 'http://localhost:3000/api/auth/discord/callback'),
      scope: ['identify', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: (err: any, user: any) => void,
  ) {
    const user = await this.usersService.findOrCreateOAuthUser('discord', {
      providerId: profile.id,
      email: profile.email,
      displayName: profile.username,
      avatarUrl: profile.avatar
        ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
        : undefined,
    });
    done(null, user);
  }
}
