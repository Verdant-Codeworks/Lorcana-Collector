"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const migrations_1 = require("@mikro-orm/migrations");
exports.default = (0, postgresql_1.defineConfig)({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    dbName: process.env.DATABASE_NAME || 'lorcana',
    user: process.env.DATABASE_USER || 'lorcana',
    password: process.env.DATABASE_PASSWORD || 'lorcana',
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    extensions: [migrations_1.Migrator],
    migrations: {
        path: './src/migrations',
        pathTs: './src/migrations',
    },
});
//# sourceMappingURL=mikro-orm.config.js.map