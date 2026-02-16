import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import type { LoginResponse, AuthUser } from '@illumineer-vault/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, displayName?: string): Promise<LoginResponse> {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.usersService.createWithPassword(email, password, displayName);
    return this.buildLoginResponse(user);
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await this.usersService.validatePassword(user, password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildLoginResponse(user);
  }

  async oauthLogin(user: UserEntity): Promise<LoginResponse> {
    return this.buildLoginResponse(user);
  }

  buildLoginResponse(user: UserEntity): LoginResponse {
    const payload = { sub: user.id, email: user.email };
    return {
      user: this.toAuthUser(user),
      accessToken: this.jwtService.sign(payload),
    };
  }

  toAuthUser(user: UserEntity): AuthUser {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    };
  }
}
