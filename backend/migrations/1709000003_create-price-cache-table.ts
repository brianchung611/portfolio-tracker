/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('price_cache', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    coin_id: {
      type: 'varchar(100)',
      notNull: true,
      comment: 'CoinGecko coin ID',
    },
    currency: {
      type: 'varchar(10)',
      notNull: true,
      comment: 'Currency code (e.g., usd, eur, jpy)',
    },
    price: {
      type: 'decimal(20, 8)',
      notNull: true,
      comment: 'Current price in the specified currency',
    },
    last_updated: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Create unique constraint on coin_id + currency combination
  pgm.createConstraint('price_cache', 'unique_coin_currency', {
    unique: ['coin_id', 'currency'],
  });

  // Create indexes for faster queries
  pgm.createIndex('price_cache', ['coin_id', 'currency']);
  pgm.createIndex('price_cache', 'last_updated');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('price_cache');
}
