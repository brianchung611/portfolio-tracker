# Portfolio Tracker - Phase 1

A cryptocurrency portfolio tracker built with React, TypeScript, Node.js, Express, and PostgreSQL. Phase 1 focuses on crypto tracking, with stock tracking planned for future phases.

## Project Structure

```
portfolio-tracker/
├── backend/          # Express + TypeScript API
├── frontend/         # React + TypeScript UI (to be added)
└── package.json      # Root workspace config
```

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Auth**: JWT + bcrypt
- **Price API**: CoinGecko (free tier)
- **Scheduler**: node-cron

### Frontend (Coming Soon)
- **Framework**: React
- **Language**: TypeScript

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### 1. Install Dependencies

From the root directory:
```bash
npm install
```

This will install dependencies for both backend and frontend workspaces.

### 2. Database Setup

Create a PostgreSQL database:
```bash
createdb portfolio_tracker
```

Or using psql:
```sql
CREATE DATABASE portfolio_tracker;
```

### 3. Environment Configuration

Copy the example env file:
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_tracker
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_secure_random_string
```

### 4. Run Database Migrations

```bash
cd backend
npm run migrate:up
```

This will create the following tables:
- `users` - User accounts
- `holdings` - Crypto holdings per user
- `price_cache` - Cached price data from CoinGecko

### 5. Start Development Server

From the root directory:
```bash
npm run dev:backend
```

The backend API will start on `http://localhost:3001`

## Database Schema

### Users Table
- `id` (serial, primary key)
- `email` (varchar, unique)
- `password_hash` (varchar)
- `preferred_currency` (varchar, default: 'usd')
- `created_at`, `updated_at` (timestamp)

### Holdings Table
- `id` (serial, primary key)
- `user_id` (integer, foreign key → users)
- `coin_id` (varchar) - CoinGecko ID
- `coin_symbol` (varchar) - e.g., BTC
- `coin_name` (varchar) - e.g., Bitcoin
- `quantity` (decimal)
- `purchase_price` (decimal, optional)
- `purchase_date` (timestamp, optional)
- `created_at`, `updated_at` (timestamp)

### Price Cache Table
- `id` (serial, primary key)
- `coin_id` (varchar)
- `currency` (varchar)
- `price` (decimal)
- `last_updated` (timestamp)

## Phase 1 Features (MVP)

- [ ] User authentication (register/login)
- [ ] Add/edit/delete crypto holdings
- [ ] View portfolio value in preferred currency
- [ ] Automatic price updates via CoinGecko API
- [ ] Basic P&L calculation

## API Endpoints (To Be Implemented)

### Auth
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user

### Portfolio
- `GET /api/portfolio` - Get user's portfolio
- `POST /api/holdings` - Add new holding
- `PUT /api/holdings/:id` - Update holding
- `DELETE /api/holdings/:id` - Delete holding

### Prices
- `GET /api/prices/:coinId` - Get current price

## Next Steps

1. ✅ Project structure setup
2. ✅ Database schema created
3. ⏳ Implement authentication endpoints
4. ⏳ Implement portfolio management endpoints
5. ⏳ Implement CoinGecko API integration
6. ⏳ Set up price polling scheduler
7. ⏳ Build React frontend

## Development Commands

```bash
# Install dependencies
npm install

# Run backend in dev mode
npm run dev:backend

# Run database migrations
npm run migrate:up --workspace=backend

# Rollback last migration
npm run migrate:down --workspace=backend

# Build backend
npm run build:backend
```
