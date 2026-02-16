import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { ConfigService } from '@nestjs/config';

export function getDatabaseConfig(configService: ConfigService) {
  const databaseUrl = configService.get<string>('DATABASE_URL');

  return defineConfig({
    ...(databaseUrl
      ? { clientUrl: databaseUrl }
      : {
          host: configService.get('DATABASE_HOST', 'localhost'),
          port: configService.get<number>('DATABASE_PORT', 5432),
          dbName: configService.get('DATABASE_NAME', 'illumineer_vault'),
          user: configService.get('DATABASE_USER', 'postgres'),
          password: configService.get('DATABASE_PASSWORD', 'postgres'),
        }),
    ...(databaseUrl && {
      driverOptions: {
        connection: { ssl: { rejectUnauthorized: false } },
      },
    }),
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
