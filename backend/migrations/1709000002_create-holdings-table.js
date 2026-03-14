/* eslint-disable @typescript-eslint/naming-convention */
export const shorthands = undefined;

export async function up(pgm) {
  pgm.createTable('holdings', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    coin_id: {
      type: 'varchar(100)',
      notNull: true,
      comment: 'CoinGecko coin ID (e.g., bitcoin, ethereum)',
    },
    coin_symbol: {
      type: 'varchar(20)',
      notNull: true,
      comment: 'Coin symbol (e.g., BTC, ETH)',
    },
    coin_name: {
      type: 'varchar(100)',
      notNull: true,
      comment: 'Full coin name (e.g., Bitcoin, Ethereum)',
    },
    quantity: {
      type: 'decimal(20, 8)',
      notNull: true,
      comment: 'Amount of crypto held',
    },
    purchase_price: {
      type: 'decimal(20, 8)',
      comment: 'Optional: Price per coin when purchased',
    },
    purchase_date: {
      type: 'timestamp',
      comment: 'Optional: When the holding was purchased',
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Create indexes for faster queries
  pgm.createIndex('holdings', 'user_id');
  pgm.createIndex('holdings', 'coin_id');
}

export async function down(pgm) {
  pgm.dropTable('holdings');
}
