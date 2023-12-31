/* eslint-disable no-lone-blocks */
import React from 'react';
import propTypes from 'prop-types';

function BreadCrumb(props) {
  const { crumbs = [] } = props;

  const content = crumbs?.map((crumb, idx) => {
    if (idx === 0) {
      return (
        <li key={idx}>
          <h1 className='title'>{crumb}</h1>
        </li>
      );
    }
    return (
      <li className='sub-title' key={idx}>
        {crumb}
      </li>
    );
  });

  return (
    <div className='text-sm breadcrumbs items-center'>
      <ul>{content}</ul>
    </div>
  );
}

BreadCrumb.propTypes = {
  crumbs: propTypes.array,
};

export default BreadCrumb;
