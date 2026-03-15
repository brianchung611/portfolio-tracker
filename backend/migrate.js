// Load environment variables first
require('dotenv').config();

// Then run the migration CLI
require('node-pg-migrate/bin/node-pg-migrate');