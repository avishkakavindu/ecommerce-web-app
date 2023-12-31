import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

import { DeleteIcon, EditIcon, SearchIcon, StarIcon } from '../icons';
import { fetchImage } from '../../services/attachment.services';

const Row = ({ _id, sku, mainImage, name, quantity, user }) => {
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      const { accessToken, refreshToken } = user;

      const image = await fetchImage(
        mainImage?.location,
        accessToken,
        refreshToken
      );
      setImageSrc(image);
    };

    fetchImageData();
  }, [mainImage]);

  const handleEditClick = () => {
    navigate(`/product?md=edit&i=${_id}`);
  };

  return (
    <tr>
      <td className='sku-row'>{`#${sku}`}</td>
      <td>
        <img src={imageSrc} alt={name} />
      </td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>
        <div className='flex gap-x-1 flex-row-reverse'>
          <DeleteIcon width={25} height={25} />
          <span onClick={handleEditClick}>
            <EditIcon width={25} height={25} />
          </span>
          <StarIcon width={25} height={25} />
        </div>
      </td>
    </tr>
  );
};

function CustomTable(props) {
  const { dataList = [], user } = props;

  return (
    <div className='w-full overflow-x-auto overflow-y-auto h-[400px]'>
      <table className='table custom-table table-pin-rows table-pin-cols'>
        {/* head */}
        <thead>
          <tr>
            <th>SKU</th>
            <th>IMAGE</th>
            <th>PRODUCT NAME</th>
            <th>QUANTITY</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {dataList?.length > 0 ? (
            dataList?.map((data, idx) => (
              <Row key={data?.sku || `row_${idx}`} {...data} user={user} />
            ))
          ) : (
            <tr>
              <td
                colSpan='5'
                className='text-center'
                style={{ height: '100px' }}
              >
                <div className='flex justify-center items-center text-2xl'>
                  <SearchIcon width={36} height={36} color={'#162427'} />
                  No Records Found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

CustomTable.propTypes = {
  dataList: propTypes.arrayOf(propTypes.object),
  user: propTypes.object,
};

export default CustomTable;
