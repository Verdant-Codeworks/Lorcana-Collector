import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { ConfigService } from '@nestjs/config';

export function getDatabaseConfig(configService: ConfigService) {
  return defineConfig({
    host: configService.get('DATABASE_HOST', 'localhost'),
    port: configService.get<number>('DATABASE_PORT', 5432),
    dbName: configService.get('DATABASE_NAME', 'lorcana'),
    user: configService.get('DATABASE_USER', 'postgres'),
    password: configService.get('DATABASE_PASSWORD', 'postgres'),
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    extensions: [Migrator],
    migrations: {
      path: './src/migrations',
      pathTs: './src/migrations',
    },
    schemaGenerator: {
      disableForeignKeys: true,
    },
  });
}
