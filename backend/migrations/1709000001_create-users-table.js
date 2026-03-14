/* eslint-disable @typescript-eslint/naming-convention */
export const shorthands = undefined;

export async function up(pgm) {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    email: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    password_hash: {
      type: 'varchar(255)',
      notNull: true,
    },
    preferred_currency: {
      type: 'varchar(10)',
      notNull: true,
      default: 'usd',
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

  // Create index on email for faster lookups
  pgm.createIndex('users', 'email');
}

export async function down(pgm) {
  pgm.dropTable('users');
}
