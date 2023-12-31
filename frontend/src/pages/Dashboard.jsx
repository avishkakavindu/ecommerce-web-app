import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import { StarFillIcon } from '../components/icons';
import CustomTable from '../components/CustomTable/CustomTable';
import {
  deleteProductById,
  fetchProductList,
} from '../services/product.services';
import BreadCrumb from '../components/BreadCrumb';
import Modal from '../components/Modal';

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [productList, setProductList] = useState([]);
  const [show, setShow] = useState({ show: false, productId: null });

  useEffect(() => {
    getProductList();
  }, []);

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

  const handleShow = (productId) => {
    setShow((prev) => {
      return { show: !prev?.show, productId };
    });
  };

  const handleDeleteProduct = async () => {
    const { accessToken, refreshToken } = user;
    const success = await deleteProductById(
      show?.productId,
      accessToken,
      refreshToken
    );
    if (success) {
      // On successful deletion, refetch the product list
      getProductList();
      // Hide the modal or perform any other necessary actions
      setShow({ show: false, productId: null });
    }
  };
  return (
    <div className='dashboard '>
      <BreadCrumb crumbs={['Products']} />
      <Modal
        show={show}
        handleShow={handleShow}
        handleDeleteProduct={handleDeleteProduct}
      />

      <div className='flex header justify-between gap-x-2'>
        <SearchBar />
        <div className='flex gap-x-2'>
          <button
            type='button'
            className='btn bg-primary text-light'
            onClick={() => navigate('/product')}
          >
            New Product
          </button>
          <button className='btn btn-outline btn-primary'>
            <StarFillIcon />
          </button>
        </div>
      </div>

      <div className='flex mt-4'>
        <CustomTable
          dataList={productList}
          user={user}
          handleShow={handleShow}
        />
      </div>
    </div>
  );
}

export default Dashboard;
