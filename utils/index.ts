import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, fuel } = filters;

    const params = new URLSearchParams({
        make: manufacturer,
        model,
        ...(fuel && { fuel_type: fuel }),
        ...(year && { year: String(year) }),
    });

    const response = await fetch(`/api/cars?${params}`);
    const result = await response.json();

    return result;
}

export const calculateCarRent = (city_mpg: number | string, year: number) => {
    const basePricePerDay = 50;
    const mileageFactor = 0.1;
    const ageFactor = 0.05;

    const mpg = typeof city_mpg === 'number' ? city_mpg : 0;
    const mileageRate = mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

const capitalize = (str: string) =>
  str.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

export const fetchCarImage = async (car: CarProps): Promise<string> => {
  const { make, model, year } = car;
  const apiKey = process.env.NEXT_PUBLIC_CARIMAGES_KEY;

  try {
    const params = new URLSearchParams({
      api_key: apiKey || '',
      make: capitalize(make),
      model: capitalize(model),
      year: String(year),
    });
    const res = await fetch(`https://carimagesapi.com/api/v1/signed-url?${params}`);
    if (!res.ok) return '/hero.png';
    const data = await res.json();
    return data.url ?? '/hero.png';
  } catch {
    return '/hero.png';
  }
};
