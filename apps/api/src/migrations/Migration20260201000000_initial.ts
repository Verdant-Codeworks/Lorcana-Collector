import { Migration } from '@mikro-orm/migrations';

export class Migration20260201000000_initial extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NULL,
        display_name VARCHAR(255) NULL,
        avatar_url VARCHAR(255) NULL,
        google_id VARCHAR(255) NULL UNIQUE,
        discord_id VARCHAR(255) NULL UNIQUE,
        created_at TIMESTAMPTZ NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NULL DEFAULT NOW()
      )
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS sets (
        set_id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        set_num INT NOT NULL,
        release_date VARCHAR(255) NULL,
        card_count INT NOT NULL DEFAULT 0
      )
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS cards (
        unique_id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        artist VARCHAR(255) NOT NULL,
        set_id VARCHAR(255) NOT NULL REFERENCES sets(set_id),
        set_name VARCHAR(255) NOT NULL,
        card_num VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        rarity VARCHAR(255) NOT NULL,
        cost INT NOT NULL,
        inkable BOOLEAN NOT NULL,
        strength INT NULL,
        willpower INT NULL,
        lore INT NULL,
        body_text TEXT NULL,
        flavor_text TEXT NULL,
        classifications VARCHAR(255) NULL,
        character_name VARCHAR(255) NULL,
        franchise VARCHAR(255) NULL,
        image_url VARCHAR(512) NOT NULL,
        version VARCHAR(255) NULL,
        layout VARCHAR(255) NULL,
        move_cost INT NULL,
        legality VARCHAR(255) NULL,
        price_usd VARCHAR(255) NULL,
        price_usd_foil VARCHAR(255) NULL,
        tcgplayer_id INT NULL,
        date_added VARCHAR(255) NULL,
        date_modified VARCHAR(255) NULL,
        synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    this.addSql('CREATE INDEX IF NOT EXISTS cards_set_id_index ON cards(set_id)');
    this.addSql('CREATE INDEX IF NOT EXISTS cards_color_index ON cards(color)');
    this.addSql('CREATE INDEX IF NOT EXISTS cards_type_index ON cards(type)');
    this.addSql('CREATE INDEX IF NOT EXISTS cards_rarity_index ON cards(rarity)');
    this.addSql('CREATE INDEX IF NOT EXISTS cards_character_name_index ON cards(character_name)');
    this.addSql('CREATE INDEX IF NOT EXISTS cards_franchise_index ON cards(franchise)');

    this.addSql(`
      CREATE TABLE IF NOT EXISTS collections (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NULL,
        filters JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NULL DEFAULT NOW()
      )
    `);

    this.addSql(`
      CREATE TABLE IF NOT EXISTS user_cards (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        card_unique_id VARCHAR(255) NOT NULL REFERENCES cards(unique_id) ON DELETE CASCADE,
        count INT NOT NULL DEFAULT 1,
        added_at TIMESTAMPTZ NULL DEFAULT NOW(),
        UNIQUE(user_id, card_unique_id)
      )
    `);
  }

  override async down(): Promise<void> {
    this.addSql('DROP TABLE IF EXISTS user_cards');
    this.addSql('DROP TABLE IF EXISTS collections');
    this.addSql('DROP TABLE IF EXISTS cards');
    this.addSql('DROP TABLE IF EXISTS sets');
    this.addSql('DROP TABLE IF EXISTS users');
  }
}
