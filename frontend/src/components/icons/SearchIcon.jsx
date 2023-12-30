import * as React from 'react';
import PropTypes from 'prop-types';

function Search(props) {
  const { color, width, height } = props;
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      fill='none'
      viewBox='0 0 24 24'
    >
      <g
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.25'
        clipPath='url(#clip0_184_402)'
      >
        <path d='M3 10a7 7 0 1014 0 7 7 0 00-14 0zM21 21l-6-6' />
      </g>
      <defs>
        <clipPath id='clip0_184_402'>
          <path fill='#fff' d='M0 0H24V24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}
Search.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Search;
