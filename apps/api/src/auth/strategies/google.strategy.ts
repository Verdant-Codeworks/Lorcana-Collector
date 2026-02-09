import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID', 'not-configured'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET', 'not-configured'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL', 'http://localhost:3000/api/auth/google/callback'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this.usersService.findOrCreateOAuthUser('google', {
      providerId: profile.id,
      email: profile.emails[0].value,
      displayName: profile.displayName,
      avatarUrl: profile.photos?.[0]?.value,
    });
    done(null, user);
  }
}
