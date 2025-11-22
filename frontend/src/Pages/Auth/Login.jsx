import React, { useState } from 'react'
import AuthLayout from '../../Components/Layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/ApiPath';
import { UserContext } from '../../Context/userContext';


export const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const { updateUser } = React.useContext(UserContext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return;
    }
    if(!password){
      setError('Please enter your password');
      return;
    }
    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });
      const { id ,fullName, token} = response.data;
      console.log(response.data);
      const user = { id, fullName };
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
        
        
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  }

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold mb-6 text-black'>Welcome Back </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please login to your account</p>


        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <Input type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder='abcd@example.com'
          />

          <Input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder='Min. 8 characters'
          />

          {error && <p className='text-red-500 text-sm pb-2.5'>{error}</p>}

          <button type='submit' className='w-full bg-primary text-white py-3 rounded-md mt-4 shadow-lg shadow-purple-600/5 p-2.5 hover:bg-primary-dark transition'>
            Login
          </button>
          <p className='text-sm text-slate-700 mt-4'>
            Don't have an account ? {""}
            <Link className="font-medium text-primary underline" to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  )
}
