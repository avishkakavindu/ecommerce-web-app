import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import BreadCrumb from '../components/BreadCrumb';
import { fetchProductById } from '../services/product.services';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Product() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const searchParams = new URLSearchParams(location.search);
  const md = searchParams.get('md');

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const productId = searchParams.get('i');

    if (productId) {
      const { accessToken, refreshToken } = user;
      getProductById(productId, accessToken, refreshToken);
    } else {
      navigate('/');
    }
  }, [md]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getBreadCrumbText = () => {
    if (md === 'edit') {
      return ['Products', 'Edit Product'];
    }
    return ['Products', 'Add new product'];
  };

  const onSubmit = async (data) => {
    try {
      const mainImageResponse = await uploadAttachment(data.mainImage[0]);
      const mainImageId = mainImageResponse.data._id;

      const imagesIds = await Promise.all(
        data.images.map((image) => uploadAttachment(image))
      );

      const productData = {
        sku: data.sku,
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        mainImage: mainImageId,
        images: imagesIds.map((image) => image.data._id),
      };

      const productResponse = await axios.post(
        '{{product_endpoint}}',
        productData
      );
      console.log('Product created:', productResponse.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const uploadAttachment = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await axios.post('{{base_url}}/attachments', formData);
  };

  const getProductById = async (id, accessToken, refreshToken) => {
    const data = await fetchProductById(id, accessToken, refreshToken);
    if (data) {
      setProductData(data);
    } else {
      toast.error('No product found');
      navigate('/');
    }
  };

  return (
    <div className='add-product'>
      <BreadCrumb crumbs={getBreadCrumbText()} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-6 space mt-4'>
          <div className='col-span-2 form-control w-full w-1/2'>
            <div className='label'>
              <span className='label-text mr-4'>SKU</span>
              <input
                type='text'
                value={productData?.sku || ''}
                placeholder='Type here'
                className='input input-bordered w-full'
                {...register('sku', { required: 'SKU is required' })}
              />
            </div>
            <div className='label'>
              <span className='label-text-alt'></span>
              {errors?.sku && (
                <span className='label-text-alt error'>
                  {errors.sku.message}
                </span>
              )}
            </div>
          </div>

          <div className='form-control w-full '>
            <div className='label'>
              <span className='label-text mr-4'>Name</span>
              <input
                type='text'
                value={productData?.name || ''}
                placeholder='Type here'
                className='input input-bordered w-full'
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            <div className='label'>
              <span className='label-text-alt'></span>
              {errors?.name && (
                <span className='label-text-alt error'>
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className='form-control w-full '>
            <div className='label'>
              <span className='label-text mr-4'>QTY</span>
              <input
                type='text'
                value={productData?.quantity || ''}
                placeholder='Type here'
                className='input input-bordered w-full'
                {...register('quantity', { required: 'Quantity is required' })}
              />
            </div>
            <div className='label'>
              <span className='label-text-alt'></span>
              {errors?.quantity && (
                <span className='label-text-alt error'>Bottom Right label</span>
              )}
            </div>
          </div>

          <div className='col-span-2 form-control'>
            <div className=''>
              <div className='label-text'>Description</div>
              <small className='text-secondary'>
                A small description about the product
              </small>
            </div>
            <textarea
              className='textarea textarea-bordered h-24'
              value={productData?.description || ''}
              placeholder=''
              {...register('description', {
                required: 'Description is required',
              })}
            ></textarea>
            <div className='label'>
              <span className='label-text-alt'></span>
              {errors?.description && (
                <span className='label-text-alt error'>
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className='col-span-2 form-control'>
            <div>
              <div className='label-text flex space-x-6'>
                <span>Product Images</span>
                <span className='text-primary underline'> Add Images</span>
              </div>
              <small className='text-secondary'>
                JPEG, PNG, SVG, or GIF (Maximum file size 50MB)
              </small>
            </div>
            <input
              type='file'
              className='file-input file-input-ghost w-full max-w-xs hidden'
              {...register('productImages', {
                required: 'Please select an image file.',
                validate: {
                  acceptedFormats: (value) =>
                    /\.(jpg|jpeg|png|svg|gif)$/i.test(value[0].name) ||
                    'Accepted formats: JPG, JPEG, PNG, SVG, GIF',
                  maxFileSize: (value) =>
                    value[0].size <= 50000000 ||
                    'Maximum file size exceeded (50MB)',
                },
              })}
            />
            {errors?.productImages && (
              <div className='label'>
                <span className='label-text-alt error'>
                  {errors.productImages.message}
                </span>
              </div>
            )}
          </div>

          <div className='col-span-2 form-control flex-row-reverse w-full'>
            <button className='btn bg-primary text-light hover:text-primary'>
              Add product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Product;
