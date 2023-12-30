import React from 'react';

const mockData = [
  {
    _id: '123',
    name: 'product 1',
    mainImage:
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    quantity: 1000,
  },
  {
    _id: '123',
    name: 'product 1',
    mainImage:
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    quantity: 1000,
  },
  {
    _id: '123',
    name: 'product 1',
    mainImage:
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    quantity: 1000,
  },
];

const Row = ({
  _id,
  sku,
  mainImage = 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  name,
  quantity,
}) => {
  return (
    <tr>
      <td>{`#${sku}`}</td>
      <td>
        <img src={mainImage} alt={name} />
      </td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td></td>
    </tr>
  );
};

function CustomTable() {
  return (
    <div className='overflow-x-auto'>
      <table className='table custom-table'>
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

          {mockData.map((data) => (
            <Row {...data} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
