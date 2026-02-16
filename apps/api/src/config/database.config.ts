import { join } from 'path';
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { ConfigService } from '@nestjs/config';

// Resolve paths relative to the compiled output, not the CWD.
// In Docker the CWD is /app but the compiled code lives in /app/apps/api/dist.
const distDir = join(__dirname, '..');
const srcDir = join(distDir, '..', 'src');

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
      pool: {
        min: 0,
        max: 5,
        idleTimeoutMillis: 30_000,
      },
    }),
    entities: [join(distDir, '**', '*.entity.js')],
    entitiesTs: [join(srcDir, '**', '*.entity.ts')],
    extensions: [Migrator],
    migrations: {
      path: join(distDir, 'migrations'),
      pathTs: join(srcDir, 'migrations'),
    },
    schemaGenerator: {
      disableForeignKeys: true,
    },
  });
}
