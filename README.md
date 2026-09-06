# 1Fi Marketplace

This is my submission for the 1Fi SDE Intern assignment. The task was to build a
"1Fi Marketplace" section inside the Shop page of the 1Fi app, while keeping
Top Brands and Nearby Stores empty as instructed.

## What I built

- Shop page with 3 tabs: Top Brands (empty), Nearby Stores (empty), 1Fi Marketplace (fully built)
- Product listing with images, brand, price, category filters, and search
- Product detail page with variants (storage/color), ratings, and description
- EMI plan selection — the EMI amount is calculated on the backend based on the
  product price and variant, not hardcoded in the UI
- "Proceed" button that places a mock order and shows a confirmation screen
- Loading skeletons and error states with retry, wherever data is being fetched

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express + MongoDB (Mongoose)
- If MongoDB isn't running, the backend automatically falls back to reading
  data from a local JSON file, so the app still works without needing Mongo
  installed.

## Folder structure

```
1fi-marketplace/
├── backend/
│   ├── models/        Product and EMIPlan schemas
│   ├── routes/         API routes
│   ├── controllers/    route handlers
│   ├── services/       data access (Mongo or in-memory fallback)
│   ├── utils/          EMI calculation logic
│   ├── data/           seed JSON files (products, EMI plans)
│   ├── seed/           script to push seed data into MongoDB
│   └── server.js
└── frontend/
    └── src/
        ├── api/          functions that call the backend
        ├── hooks/        useProducts, useProductDetail
        ├── context/      OrderContext (keeps last order across pages)
        ├── components/   ProductCard, EMIPlanSelector, etc.
        ├── pages/        ShopPage, MarketplacePage, ProductDetailPage
        └── styles/
```

## How to run it

**Backend:**

```
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Runs on http://localhost:5000

`npm run seed` loads sample products and EMI plans into MongoDB. If MongoDB
isn't installed or running, the app still works — it just reads straight
from the JSON files instead. You'll see this in the terminal:

```
[dataStore] Ready. Source: in-memory JSON
```

**Frontend:**

```
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on http://localhost:5173 — opens straight into the Shop page.

## Why I made a few decisions the way I did

- **EMI calculated on the backend, not the frontend** — the assignment says
  not to hardcode product/EMI data in the UI. So the EMI amount is computed
  fresh from the product's price every time, using `utils/emiCalculator.js`.
- **Mongo + JSON fallback** — wanted the project to run for anyone reviewing
  it even if they don't have MongoDB set up locally.
- **Seed script instead of auto-seeding on every restart** — a real database
  shouldn't wipe itself every time the server restarts. Running `npm run seed`
  is a manual, one-time step when you want to reset the data.

## What's not done

- Top Brands and Nearby Stores are left blank — this was explicitly stated
  in the assignment.
- No automated tests — wasn't part of the requirements.
- Product images are stock photos (Unsplash), not real product photography.

## Deployment

https://1fi-marketplace-rust.vercel.app/
