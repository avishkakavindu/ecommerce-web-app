import React from 'react';
import SearchBar from '../components/SearchBar';
import { StarFillIcon } from '../components/icons';
import CustomTable from '../components/CustomTable/CustomTable';

function Dashboard() {
  return (
    <div className='dashboard '>
      <div className='title'>
        <h1>Products</h1>
      </div>

      <div className='flex header justify-between gap-x-2 border border-red-400'>
        <SearchBar />
        <div className='flex gap-x-2'>
          <button type='button' className='btn bg-primary text-light'>
            New Product
          </button>
          <button className='btn btn-outline btn-primary'>
            <StarFillIcon />
          </button>
        </div>
      </div>

      <div className='table mt-4'>
        <CustomTable />
      </div>
    </div>
  );
}

export default Dashboard;
