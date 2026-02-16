import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async findById(id: string): Promise<UserEntity | null> {
    return this.em.findOne(UserEntity, { id });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.em.findOne(UserEntity, { email });
  }

  async findByGoogleId(googleId: string): Promise<UserEntity | null> {
    return this.em.findOne(UserEntity, { googleId });
  }

  async findByDiscordId(discordId: string): Promise<UserEntity | null> {
    return this.em.findOne(UserEntity, { discordId });
  }

  async createWithPassword(email: string, password: string, displayName?: string): Promise<UserEntity> {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.em.create(UserEntity, {
      email,
      passwordHash,
      displayName,
    });
    await this.em.persistAndFlush(user);
    return user;
  }

  async findOrCreateOAuthUser(provider: 'google' | 'discord', profile: {
    providerId: string;
    email: string;
    displayName?: string;
    avatarUrl?: string;
  }): Promise<UserEntity> {
    const idField = provider === 'google' ? 'googleId' : 'discordId';
    let user = await this.em.findOne(UserEntity, { [idField]: profile.providerId });

    if (!user) {
      user = await this.em.findOne(UserEntity, { email: profile.email });
      if (user) {
        user[idField] = profile.providerId;
        if (!user.displayName && profile.displayName) user.displayName = profile.displayName;
        if (!user.avatarUrl && profile.avatarUrl) user.avatarUrl = profile.avatarUrl;
        await this.em.flush();
      } else {
        user = this.em.create(UserEntity, {
          email: profile.email,
          [idField]: profile.providerId,
          displayName: profile.displayName,
          avatarUrl: profile.avatarUrl,
        });
        await this.em.persistAndFlush(user);
      }
    }

    return user;
  }

  async validatePassword(user: UserEntity, password: string): Promise<boolean> {
    if (!user.passwordHash) return false;
    return bcrypt.compare(password, user.passwordHash);
  }

  async deleteAccount(userId: string): Promise<void> {
    const knex = this.em.getKnex();
    // Delete user's owned cards, collections, then the user
    await knex('user_cards').where('user_id', userId).delete();
    await knex('collections').where('user_id', userId).delete();
    await knex('users').where('id', userId).delete();
  }
}
