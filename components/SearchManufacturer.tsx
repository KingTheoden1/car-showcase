"use client";
import { useState, Fragment } from 'react';
import Image from 'next/image';
import { Combobox, Transition } from '@headlessui/react';
import { manufacturers } from '@/constants';
import { SearchManufacturerProps } from '@/types';

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps) => {
  const [query, setQuery] = useState('');

  const filteredManufacturers = query === ''
    ? []
    : manufacturers.filter((item) =>
        item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
      );

  return (
    <div className='search-manufacturer'>
      <Combobox value={selected} onChange={(val) => { setSelected(val); setQuery(''); }}>
        <div className='relative w-full'>
          <Combobox.Button className='absolute top-[14px]' id='headlessui-combobox-button'>
            <Image src='/car-logo.svg' width={20} height={20} className='ml-4' alt='Car logo' />
          </Combobox.Button>

          <Combobox.Input
            className='search-manufacturer__input'
            placeholder='Search manufacturer...'
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              if (value === '') {
                setSelected('');
              } else {
                const exact = manufacturers.find(
                  m => m.toLowerCase() === value.toLowerCase()
                );
                if (exact) setSelected(exact);
              }
            }}
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='search-manufacturer__options'>
              {filteredManufacturers.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none py-2 px-4 text-gray-500 dark:text-gray-400'>
                  No manufacturer found.
                </div>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className={({ active }) =>
                      `relative search-manufacturer__option ${
                        active ? 'bg-primary-blue text-white' : 'text-gray-900 dark:text-white dark:bg-[#1e1e2e]'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {item}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
