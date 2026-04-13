'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import SearchManufacturer from './SearchManufacturer';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src='/magnifying-glass.svg' alt='magnifying glass' width={40} height={40} className='object-contain' />
  </button>
);

const SearchBar = ({ setManufacturer, setModel }) => {
  const [searchManufacturer, setSearchManufacturer] = useState('');
  const [searchModel, setSearchModel] = useState('');

  // Reset to default view when both fields are cleared
  useEffect(() => {
    if (searchManufacturer === '' && searchModel === '') {
      setManufacturer('');
      setModel('');
    }
  }, [searchManufacturer, searchModel]);

  // Apply manufacturer filter immediately when selected from dropdown
  useEffect(() => {
    if (searchManufacturer !== '') {
      setManufacturer(searchManufacturer);
    }
  }, [searchManufacturer]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setManufacturer(searchManufacturer);
    setModel(searchModel);
  };

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className='searchbar__item'>
        <SearchManufacturer selected={searchManufacturer} setSelected={setSearchManufacturer} />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <div className='searchbar__item'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='car model'
        />
        <input
          type='text'
          name='model'
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder='Model (e.g. Corolla)'
          className='searchbar__input'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>
      <SearchButton otherClasses='max-sm:hidden' />
    </form>
  );
};

export default SearchBar;
