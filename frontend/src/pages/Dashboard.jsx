import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SearchBar from '../components/SearchBar';
import { StarFillIcon } from '../components/icons';
import CustomTable from '../components/CustomTable/CustomTable';
import fetchProductList from '../services/product.services';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductList();
  }, [user]);

  /**
   * Fetch product from api
   */
  const getProductList = async () => {
    const { accessToken, refreshToken } = user;
    const data = await fetchProductList(accessToken, refreshToken);
    if (data && data?.length > 0) {
      setProductList(data);
    }
  };

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
        <CustomTable dataList={productList} user={user} />
      </div>
    </div>
  );
}

export default Dashboard;
