import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, login } from '../features/auth/authSlice';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      const { message: msg, userMessage, context } = message?.data?.errors[0];

      // TODO zod validation structure is complex define a error handler
      if (msg === 'VALIDATION_ERROR') {
        // Map through the error data and display messages
        context.forEach((error) => {
          toast.error(error.message);
        });
      } else {
        toast.error(userMessage);
      }
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('Successful login');
      navigate('/');
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
