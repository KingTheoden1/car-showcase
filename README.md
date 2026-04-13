# CarHub

A modern car catalog web app built with Next.js 13, TypeScript, and Tailwind CSS. Browse, search, and filter cars by manufacturer, model, fuel type, year, drive type, and transmission — with dark/light mode support.

## Tech Stack

- **Next.js 13** (App Router)
- **React** / **TypeScript**
- **Tailwind CSS**
- **HeadlessUI** — accessible dropdowns and modals
- **Cars by API Ninjas** — car data via RapidAPI
- **CarImages API** — car images

## Features

- Search by manufacturer and model
- Filter by fuel type, year, drive type, and transmission
- Dark / light mode toggle (persists across sessions)
- Car detail modal with full specs
- Batched API requests with client-side caching to stay within free tier limits
- Fully responsive

## Getting Started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root with your API keys:

```env
NEXT_PUBLIC_CARIMAGES_KEY=your_carimages_api_key
```

> Car data uses a RapidAPI key stored in `utils/index.ts`. Replace the `X-RapidAPI-Key` value with your own from [Cars by API Ninjas](https://rapidapi.com/apininjas/api/cars-by-api-ninjas).

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## API Notes

Both APIs are on free tiers:
- **Cars by API Ninjas** — returns 1 result per make per request; drive/transmission filtering is handled client-side
- **CarImages API** — returns watermarked WebP images; 5,000 requests/month on the free plan
