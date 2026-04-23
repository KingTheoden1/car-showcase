import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params = new URLSearchParams();
  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const fuel_type = searchParams.get('fuel_type');
  const year = searchParams.get('year');

  if (make) params.set('make', make);
  if (model) params.set('model', model);
  if (fuel_type) params.set('fuel_type', fuel_type);
  if (year) params.set('year', year);

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${params}`,
    {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
      },
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}
