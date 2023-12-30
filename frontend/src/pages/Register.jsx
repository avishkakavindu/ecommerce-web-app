import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register as registerUser, reset } from '../features/auth/authSlice';

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

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
      toast.success('Successfully registered');
      navigate('/login');
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  const password = React.useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[400px]'
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='firstName'
          >
            First Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='firstName'
            type='text'
            placeholder='First Name'
            {...register('firstName', {
              required: 'First Name is required',
            })}
          />
          {errors.firstName && (
            <p className='error'>{errors.firstName.message}</p>
          )}
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='lastName'
          >
            Last Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='lastName'
            type='text'
            placeholder='Last Name'
            {...register('lastName', {
              required: 'Last Name is required',
            })}
          />
          {errors.lastName && (
            <p className='error'>{errors.lastName.message}</p>
          )}
        </div>
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
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='Password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              pattern: {
                value: /(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}/,
                message:
                  'Password must contain at least one symbol, one numeric digit, and one alphabet',
              },
            })}
          />
          {errors.password && (
            <p className='error'>{errors.password.message}</p>
          )}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='confirmPassword'
          >
            Confirm Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) =>
                value === password.current || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className='error'>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
