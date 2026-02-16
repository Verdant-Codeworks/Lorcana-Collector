import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const orm = app.get(MikroORM);
  try {
    if (process.env.DATABASE_URL) {
      // Production: run pending migrations
      const migrator = orm.getMigrator();
      const pending = await migrator.getPendingMigrations();
      console.log(`Pending migrations: ${pending.length}`);
      if (pending.length) {
        await migrator.up();
        console.log('Migrations applied successfully');
      }
    } else {
      // Development: auto-sync schema from entities
      await orm.getSchemaGenerator().updateSchema();
    }
  } catch (err) {
    console.error('Database setup failed:', err);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5174').replace(/\/+$/, '');
  console.log(`CORS origin: ${frontendUrl}`);
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}
bootstrap();
