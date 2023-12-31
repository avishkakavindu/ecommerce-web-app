import React from 'react';
import propTypes from 'prop-types';

import { AlertIcon } from './icons';

function Modal(props) {
  const { show, handleShow, handleDeleteProduct } = props;

  return (
    <dialog
      id='my_modal_3'
      className={`modal ${show?.show ? 'modal-open' : ''}`}
    >
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={handleShow}
          >
            ✕
          </button>
        </form>
        <div className='flex flex-col items-center justify-center h-full'>
          <AlertIcon />
          <h1 className='text-xl uppercase mt-2'>Are you sure?</h1>
          <p className='mt-2'>
            You will not be able to undo this action if you proceed!
          </p>
          <div className='flex gap-x-2 mt-2'>
            <button
              onClick={handleShow}
              className='btn btn-outline border border-primary hover:bg-red-500 hover:border-red-500 hover:text-light'
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteProduct}
              className='btn bg-primary text-light hover:bg-light hover:border-primary hover:text-primary'
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

Modal.propTypes = {
  show: propTypes.object,
  handleShow: propTypes.func,
};

export default Modal;
