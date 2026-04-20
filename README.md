# CarHub

A modern car catalog web app built with Next.js 13, TypeScript, and Tailwind CSS. Browse, search, and filter cars from model years 2015–2023 by manufacturer, model, fuel type, year, drive type, and transmission — with dark/light mode support.

## How It Works

When the page loads, CarHub fetches car data for a set of featured manufacturers (Toyota, Honda, Ford, BMW, Mercedes-Benz, Chevrolet, Audi, Tesla). To stay within free API rate limits, requests are sent in batches of 5 with a short delay between each batch. Results are cached client-side, so changing the drive type or transmission filter re-filters the already-loaded data instantly without making new API calls.

Users can:
- **Search** by typing a manufacturer name (with a live autocomplete dropdown) or a model name
- **Filter** by fuel type, year (2015–2023), drive type (FWD/RWD/AWD/4WD), and transmission (Automatic/Manual)
- **View details** for any car by clicking "View More" — shows full specs and multiple images
- **Toggle dark/light mode** — preference is saved to localStorage

When a specific manufacturer is searched, CarHub fetches only that manufacturer's cars directly. Drive type and transmission filters are applied client-side since the API doesn't support those parameters on the free plan.

## Tech Stack

- **Next.js 13** (App Router, client + server components)
- **React** with hooks — `useState`, `useEffect`, `useRef`
- **TypeScript**
- **Tailwind CSS**
- **HeadlessUI** — accessible Combobox (search dropdown) and Listbox (filter dropdowns)

## APIs

### Car Data — Cars by API Ninjas
Car specs (make, model, year, drive type, transmission, MPG, etc.) are fetched from the [Cars by API Ninjas API](https://api-ninjas.com/api/cars) via RapidAPI.

> **Free tier limitations:** The free plan returns only **1 car per make** per request and does not support filtering by drive type, transmission, or a result limit. Because of this, some filter combinations may return fewer results than expected, and MPG values are not available (shown as "N/A"). Drive type and transmission filtering is handled client-side against the returned data.

### Car Images — CarImages API
Car images are fetched from the [CarImages API](https://carimagesapi.com). Images are returned in WebP format and include a watermark on the free plan (5,000 requests/month).

## Getting Started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_CARIMAGES_KEY=your_carimages_api_key
```

3. In `utils/index.ts`, replace the `X-RapidAPI-Key` value with your own key from [Cars by API Ninjas on RapidAPI](https://rapidapi.com/apininjas/api/cars-by-api-ninjas).

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
