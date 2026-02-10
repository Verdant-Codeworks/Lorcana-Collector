import { Migration } from '@mikro-orm/migrations';

export class Migration20260210000000_user_cards extends Migration {
  override async up(): Promise<void> {
    // Create user_cards table
    this.addSql(`
      CREATE TABLE user_cards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        card_unique_id VARCHAR(255) NOT NULL REFERENCES cards(unique_id) ON DELETE CASCADE,
        count INT NOT NULL DEFAULT 1,
        added_at TIMESTAMPTZ NULL DEFAULT NOW(),
        UNIQUE(user_id, card_unique_id)
      )
    `);

    // Migrate data: for each user+card pair, take the MAX count across all collections
    this.addSql(`
      INSERT INTO user_cards (user_id, card_unique_id, count, added_at)
      SELECT c.user_id, cc.card_unique_id, MAX(cc.count), MIN(cc.added_at)
      FROM collection_cards cc
      JOIN collections c ON cc.collection_id = c.id
      GROUP BY c.user_id, cc.card_unique_id
    `);

    // Drop old collection_cards table
    this.addSql('DROP TABLE collection_cards');
  }

  override async down(): Promise<void> {
    // Recreate collection_cards table
    this.addSql(`
      CREATE TABLE collection_cards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
        card_unique_id VARCHAR(255) NOT NULL REFERENCES cards(unique_id) ON DELETE CASCADE,
        count INT NOT NULL DEFAULT 1,
        added_at TIMESTAMPTZ NULL DEFAULT NOW(),
        UNIQUE(collection_id, card_unique_id)
      )
    `);

    // Drop user_cards table
    this.addSql('DROP TABLE user_cards');
  }
}
