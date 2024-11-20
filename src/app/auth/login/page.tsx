'use client';
import WordPullUp from '@/components/ui/word-pull-up';
import React, { useState } from 'react';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with', credentials);
  };

  return (
    <>
      <div className="slider-thumb">
        <img
          src="https://i.ibb.co/Qrc2tps/Screenshot-2024-11-06-at-1-50-22-AM-removebg-preview.png"
          width="170px"
          className="login-img"
          style={{ zIndex: 99999 }}
        />
        <label
          htmlFor="username"
          style={{
            color: '#b3d33a',
            fontSize: '14px',
            position: 'absolute',
            left: '20%',
            top: '35%',
          }}
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          style={{
            width: '280px',
            padding: '10px',
            borderBottom: '1px solid #b3d33a',
            backgroundColor: 'transparent',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            left: '20%',
            top: '37%',
          }}
        />

        <label
          style={{
            color: '#b3d33a',
            fontSize: '14px',
            position: 'absolute',
            left: '20%',
            top: '46%',
            outline: 'none',
          }}
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          style={{
            width: '280px',
            padding: '10px',
            borderBottom: '1px solid #b3d33a',
            backgroundColor: 'transparent',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            position: 'absolute',
            left: '20%',
            top: '47%',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            padding: '10px 20px',
            border: '2px solid orange',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            position: 'absolute',
            width: '150px',
            left: '23%',
            top: '62%',
          }}
        >
          Login
        </button>
      </div>
      <WordPullUp
        className="absolute left-[50%] text-5xl bg-gradient-to-r from-[#ff8a00] via-[#e52e71] to-[#ff8a00] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent uppercase top-[40%]  font-bold tracking-[-0.02em] text-white dark:text-white  md:leading-[5rem]"
        words="Continuous Improvement Robust Tracking System"
      />{' '}
    </>
  );
}

{
  /* <button
type="submit"

>
Login
</button>

style={{
 
}} */
}
