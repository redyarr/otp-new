import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {useAuth } from './AuthContext'

const OtpInput = () => {
  const otpInputsRef = useRef([]);
  const[otpCode, setOtpCode]=useState('');
  const { isSignUp } = useAuth();
  const navigate=useNavigate()


  useEffect(() => {
    otpInputsRef.current.map((input, index) => {
      input.addEventListener('input', () => {
        const nextInput = otpInputsRef.current[index + 1];
        if (input.value && nextInput) {
          nextInput.focus();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          const prevInput = otpInputsRef.current[index - 1];
          if (prevInput && !input.value) {
            prevInput.value = '';
            prevInput.focus();
          }
        }
      });
    });

    otpInputsRef.current[0]?.focus();
  }, []);

  
  const handleChange = (index, value) => {
    setOtpCode(prevOtpCode => {
      const newOtpCode = [...prevOtpCode];
      newOtpCode[index] = value;
      return newOtpCode.join('');
    });
  };

//redyar lerayyyt !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ✨

  function clickhandeler(){
    console.log("clicked");
    fetch('http://localhost:3000/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp: otpCode }),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.valid) {
        // Return the promise from the /createUser request
        return fetch('http://localhost:3000/createUser', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .then(data => {
          if (data.valid) {
            console.log("user has been created successfully");
            navigate(-3);
            console.log("the otp is correct");
          } else {
            console.log("the user has not been created successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      } else {
        navigate(-2)
        console.log("the otp is wrong");
      }
    });}
// chakm krd !
  
  return (<>
    <NavLink to={"/"} >home</NavLink>

    <div className='main'>
      <h1>{isSignUp ? "OTP Verification" : "Two-Step Verification"}</h1>
      <p>{isSignUp ? "Enter the OTP code" : "Enter the code"} sent to your Email</p>





     <div  className='inputs'>
            {Array.from({ length: 8 }, (_, index) => (
                <input
                maxLength={1}
                key={index}
                type="text"
                className="otp-input"
                value={otpCode[index] || ''}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (otpInputsRef.current[index] = el)}
                />
            ))}

            
     </div>
     <button onClick={clickhandeler} className="otpConfirm">Verify OTP</button>
    </div>

    </>
  );
};

export default OtpInput;
