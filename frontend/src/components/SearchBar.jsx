import React from 'react';
import { SearchIcon } from './icons';

function SearchBar() {
  return (
    <div className='search-bar w-2/3'>
      <div className='search-bar__container relative flex items-center'>
        <input
          className='input input-bordered flex-1'
          placeholder='Search for products'
        />
        <button className='btn btn-sm bg-primary text-light rounded-full absolute right-2'>
          <SearchIcon color={'#fff'} width={16} height={16} />
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
