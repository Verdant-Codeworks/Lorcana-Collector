import { Migration } from '@mikro-orm/migrations';

export class Migration20260209000000_lorcast extends Migration {
  override async up(): Promise<void> {
    // Truncate existing data (new API uses different IDs)
    this.addSql('TRUNCATE TABLE collection_cards CASCADE');
    this.addSql('TRUNCATE TABLE collections CASCADE');
    this.addSql('TRUNCATE TABLE cards CASCADE');
    this.addSql('TRUNCATE TABLE sets CASCADE');

    // Change card_num from integer to varchar
    this.addSql('ALTER TABLE cards ALTER COLUMN card_num TYPE varchar(255) USING card_num::varchar');

    // Add new Lorcast-specific columns
    this.addSql('ALTER TABLE cards ADD COLUMN version varchar(255) NULL');
    this.addSql('ALTER TABLE cards ADD COLUMN layout varchar(255) NULL');
    this.addSql('ALTER TABLE cards ADD COLUMN move_cost int NULL');
    this.addSql('ALTER TABLE cards ADD COLUMN legality varchar(255) NULL');
    this.addSql('ALTER TABLE cards ADD COLUMN price_usd varchar(255) NULL');
    this.addSql('ALTER TABLE cards ADD COLUMN price_usd_foil varchar(255) NULL');
    this.addSql('ALTER TABLE cards ADD COLUMN tcgplayer_id int NULL');
  }

  override async down(): Promise<void> {
    this.addSql('ALTER TABLE cards DROP COLUMN version');
    this.addSql('ALTER TABLE cards DROP COLUMN layout');
    this.addSql('ALTER TABLE cards DROP COLUMN move_cost');
    this.addSql('ALTER TABLE cards DROP COLUMN legality');
    this.addSql('ALTER TABLE cards DROP COLUMN price_usd');
    this.addSql('ALTER TABLE cards DROP COLUMN price_usd_foil');
    this.addSql('ALTER TABLE cards DROP COLUMN tcgplayer_id');

    this.addSql('ALTER TABLE cards ALTER COLUMN card_num TYPE int USING card_num::int');
  }
}
