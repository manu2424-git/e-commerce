# Northstar Market

A complete full-stack e-commerce application built with React, Vite, Express, MongoDB, Mongoose, and JWT authentication.

## Features

- Customer registration and login with hashed passwords and JWT sessions
- Product catalog with search, category filters, stock handling, and detail pages
- Persistent localStorage shopping cart with stock limits
- Cash-on-delivery checkout that validates stock and decrements inventory atomically
- Customer order history with status badges
- Admin dashboard for product CRUD, inventory, statistics, and order status management
- Responsive layout for desktop, tablet, and mobile

## Requirements

- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas connection string

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. In one terminal:

   ```bash
   cd backend
   npm install
   npm run seed
   npm run dev
   ```

3. In a second terminal:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

The seeded admin account is `admin@example.com` with password `admin123`. Change it before using the app beyond local development.

## API

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Products

- `GET /api/products?search=&category=`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Orders

- `POST /api/orders`
- `GET /api/orders/my`
- `GET /api/orders/:id`
- `GET /api/orders` (admin)
- `PUT /api/orders/:id/status` (admin)

## Environment

Backend variables are documented in `backend/.env.example`. The frontend uses `VITE_API_URL` when supplied and otherwise calls `http://localhost:5000/api`.