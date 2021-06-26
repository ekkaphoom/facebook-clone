import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { signin } from 'next-auth/client';

const Login = props => {
  return (
    <div className='grid place-items-center'>
      <Image src='http://links.papareact.com/t4i' height={400} width={400} objectFit='contain' />
      <h1 onClick={signin} className='p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer'> Login with facebook </h1>
    </div>
  )
}

Login.propTypes = {

}

export default Login
