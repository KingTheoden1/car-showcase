"use client";

import { useEffect, useState, useRef } from 'react';
import { fetchCars } from '@/utils';
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import { fuels, yearsOfProduction, driveTypes, transmissions, manufacturers, featuredManufacturers } from '@/constants';
import Image from 'next/image';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search states
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');

  // Filter states
  const [fuel, setFuel] = useState('');
  const [year, setYear] = useState('');
  const [drive, setDrive] = useState('');
  const [transmission, setTransmission] = useState('');

  // Pagination states
  const [limit, setLimit] = useState(10);

  // Cache raw API results so drive/transmission changes don't re-trigger API calls
  const cachedCars = useRef<any[]>([]);
  const lastFetchKey = useRef('');

  const applyClientFilters = (cars: any[]) =>
    cars.filter(car => {
      if (drive && car.drive?.toLowerCase() !== drive.toLowerCase()) return false;
      if (transmission && car.transmission !== transmission) return false;
      return true;
    });

  const fetchAllMakes = async (filters: any, makeList: string[] = featuredManufacturers) => {
    const results: any[] = [];
    const batchSize = 5;
    for (let i = 0; i < makeList.length; i += batchSize) {
      const batch = makeList.slice(i, i + batchSize);
      const settled = await Promise.allSettled(
        batch.map(make => fetchCars({ ...filters, manufacturer: make.toLowerCase() }))
      );
      settled
        .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled' && Array.isArray(r.value))
        .forEach(r => results.push(...r.value));
      if (i + batchSize < manufacturers.length) {
        await new Promise(res => setTimeout(res, 300));
      }
    }
    return results;
  };

  const getCars = async () => {
    const fetchKey = `${fuel}|${year}|${manufacturer}|${model}`;
    if (fetchKey === lastFetchKey.current && cachedCars.current.length > 0) {
      setAllCars(applyClientFilters(cachedCars.current));
      return;
    }

    setLoading(true);
    try {
      const filters = {
        year: year || '',
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
        drive: '',
        transmission: '',
      };

      let raw: any[];
      if (!manufacturer) {
        raw = await fetchAllMakes(filters, featuredManufacturers);
      } else {
        const res = await fetchCars({ ...filters, manufacturer });
        raw = Array.isArray(res) ? res : [];
      }

      cachedCars.current = raw;
      lastFetchKey.current = fetchKey;
      setAllCars(applyClientFilters(raw));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch from API when these change
  useEffect(() => {
    getCars();
  }, [fuel, year, manufacturer, model]);

  // Client-side only re-filter when drive/transmission change
  useEffect(() => {
    if (cachedCars.current.length > 0) {
      setAllCars(applyClientFilters(cachedCars.current));
    }
  }, [drive, transmission]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-x-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y
      max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className="text-4xl font-extrabold dark:text-white">Car Catalog</h1>
          <p className='dark:text-gray-300'>Explore the cars of your dreams</p>
        </div>

        <div className='home__filters'>
          <SearchBar  setManufacturer={setManufacturer} 
          setModel={setModel} />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} setFilter={setFuel} />
            <CustomFilter title='year' options={yearsOfProduction} setFilter={setYear} />
            <CustomFilter title='drive' options={driveTypes} setFilter={setDrive} />
            <CustomFilter title='transmission' options={transmissions} setFilter={setTransmission} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car, index) => (
                <CarCard key={`${car.make}-${car.model}-${car.year}-${index}`} car={car}/>
              ))}
            </div>
            
            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image 
                  src='/loader.svg'
                  alt='loader'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore 
              pageNumber={limit /10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ): (
          <div className='home__error-container'>
            <h2 className='text-black dark:text-white text-xl font-bold'>Opps, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
        
      </div>
    </main>
  );
};
