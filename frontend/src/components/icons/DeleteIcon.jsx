import * as React from 'react';
import PropTypes from 'prop-types';

function DeleteIcon(props) {
  const { color = '#001EB9', width = 25, height = 25 } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.0938 6.25H17.9688V4.29688C17.9688 3.43506 17.2681 2.73438 16.4062 2.73438H8.59375C7.73193 2.73438 7.03125 3.43506 7.03125 4.29688V6.25H3.90625C3.47412 6.25 3.125 6.59912 3.125 7.03125V7.8125C3.125 7.91992 3.21289 8.00781 3.32031 8.00781H4.79492L5.39795 20.7764C5.43701 21.6089 6.12549 22.2656 6.95801 22.2656H18.042C18.877 22.2656 19.563 21.6113 19.6021 20.7764L20.2051 8.00781H21.6797C21.7871 8.00781 21.875 7.91992 21.875 7.8125V7.03125C21.875 6.59912 21.5259 6.25 21.0938 6.25ZM16.2109 6.25H8.78906V4.49219H16.2109V6.25Z'
        fill={color}
      />
    </svg>
  );
}
DeleteIcon.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default DeleteIcon;
