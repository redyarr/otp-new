import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ggl from '../assets/fb.png'
import fb from '../assets/ggl.png'
import {useAuth } from './AuthContext'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsSignUp } = useAuth();



  const [otp, setOtp] = useState(null);



  function clickHandler(){
    // setIsSignUp(false);


fetch("http://localhost:3000/login", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email: email, password: password }),
  credentials: 'include'
}).then(response => response.json()).then(data => {
  if (data.valid) {
    setIsSignUp(true);
    
    return navigate("/sucess")
  } else {
    setError("Invalid credentials");
  }
}).catch((err) => {
  console.log(err);
}
);




    // const isValidCredentials = email === 'user@example.com' && password === 'secret';

      // if(isValidCredentials){
      //   return navigate("/otp")
      // }

      // else if(email!=='user@example.com' && password=='secret'){
      //   setError("your email is wrong!")
      // // }
      // else if(email=='user@example.com' && password!=='secret' ){
      //   setError("your password is wrong!")
      // }

      // else if(email=='' && password=='' ){
      //   setError("email and password are require!")
      // }
      
      // else if(email!=='user@example.com' && password!=='secret' ){
      //   setError("somthing went wrong!")
      // }

  

  }



  return (
    <>
  <NavLink to={"/"} >home</NavLink>

    <div className='login-container'>
        <h1>Welcome back!</h1>
        <p style={{color:" rgb(72, 72, 72)"}}>log in to use the latest future of our application!</p>

      <div className="error">
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>  

      <div className="login-inputs">
        <div className="email">
          <label htmlFor="email">Email Address</label>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required type="email" />
        </div>

        <div className="pass">
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type="password" />
        </div>
      </div>

      <div className="remem-forgot">
          <div className="check">
              <input id='checkbox' type="checkbox" name="remember" value="remember"/>
              <label name="checkbox" htmlFor="checkbox">remember me</label>
          </div>

         <NavLink className="forgot" to={"#"}>forgot password</NavLink>
        </div>     
        
 <br />

      <div className="login-button">
        <button onClick={clickHandler}>Log in</button>
      </div>


      <p>dont have an account? <span><NavLink to={"/signUp"} >Sign up</NavLink></span></p>
<hr />

      <p>or login whith</p>
      <div className='login-with'>
        <NavLink style={{textDecoration:"none"}} to="#">
        <div className="ggl">
            <img src={ggl} alt="" />
            <p>Continue With Google</p>
        </div>
        </NavLink>

        <NavLink style={{textDecoration:"none"}} to="#">
        <div className="fb">
            <img src={fb} alt="" />
            <p>Continue With Facebook</p>
        </div>
        </NavLink>
        
      </div>
    </div>



   </>
  )

}


export default Login
