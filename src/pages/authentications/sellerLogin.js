import React, { useState } from 'react';
import '../../styles/auth.css';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/context';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';

import { firebaseConfig } from '../../firebase';

const SellerLogin = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setSellerData } = useUser();
  const navigate = useNavigate();

  const loginSeller = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('All fields required');
      return;
    }

    setError('');

    try {
      const firebaseApp = initializeApp(firebaseConfig);
      const auth = getAuth(firebaseApp);

      const userCredentials = await signInWithEmailAndPassword(auth, email, password);

      // Additional logic after successful login
      const user = userCredentials.user;
      setSellerData({
        name: user.displayName, // Assuming you set the displayName during registration
        email: user.email,
      });

      navigate('/sellProducts');
    } catch (error) {
      console.error('Error logging in seller:', error);
      setError('Wrong email or password'); // You might want to handle different error messages
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <form id='form' autoComplete='off'>
          <h3 style={{ textShadow: '3px' }}>Login to seller account</h3>

          <div className='mt-2'>
            <label htmlFor='email'>Enter email </label>
            <input className='form-contrl' type='email' id='email' required placeholder='Eg abc@gmail.com' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mt-2'>
            <label htmlFor='password'>Enter password </label>
            <input className='form-contrl' type='password' id='password' required placeholder='Eg abc@gmail.com' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <span style={{ color: 'red' }}>{error}</span>
          <div className='mt-2'>
            <button className='bg-primary' type='submit' style={{ width: '300px', height: '50px' }} onClick={(e) => loginSeller(e)}>
              Login
            </button>
          </div>
          <div className='mt-2'>
            <p>
              Don't have an account?? <Nav.Link as={Link} to='/sellerRegister' style={{ color: 'blue' }}>
                Register
              </Nav.Link>{' '}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
