import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    setIsAuthenticated(user ? true : false);
  }, [user]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout(user));
    dispatch(reset(user));
    navigate('/login');
  };

  return (
    <div className='flex justify-between items-center py-4 px-6 md:px-[100px] bg-light text-dark'>
      {/* Left side content */}
      <div className='flex items-center space-x-4'>{/* logo */}</div>

      {/* Right side content */}
      <div className='flex items-center space-x-4'>
        {isAuthenticated ? (
          <>
            {/* Dropdown */}
            <div className='relative'>
              <button
                onClick={toggleDropdown}
                className='flex items-center focus:outline-none'
              >
                <span>ADMIN</span>
                {/* Add an arrow or icon as needed */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 ml-1'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>

              {/* Dropdown content */}
              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 px-4 bg-white border border-gray-300 rounded-lg shadow-lg py-2 w-48 z-10'>
                  {/* Dropdown items */}
                  <button
                    type='button'
                    onClick={handleLogout}
                    disabled={isLoading}
                    className='w-full bg-red-500 hover:bg-red-400 rounded-xl block px-4 py-2 text-gray-800 hover:bg-gray-200'
                  >
                    logout{' '}
                  </button>
                </div>
              )}
            </div>

            {/* Avatar */}
            {/* Avatar with active badge */}
            <div className='relative'>
              <div className='avatar relative'>
                <div className='w-[58px] h-[58px] rounded-full'>
                  <img
                    src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                    alt='Online Avatar'
                  />
                </div>
                <span className='absolute bottom-1 right-0 bg-green-500 rounded-full w-3 h-3 border-2 border-white'></span>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
