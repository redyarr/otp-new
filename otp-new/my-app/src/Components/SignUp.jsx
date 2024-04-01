import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import ggl from '../assets/fb.png'
import fb from '../assets/ggl.png'
import style from './SignUp.module.css'
import {useAuth } from './AuthContext'


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const time=new Date().getHours()
  const { setIsSignUp } = useAuth();
  const nav=useNavigate()
  let greeting;


  console.log(name + email + password );

  switch(true){
    case time>=0 && time<12 : {greeting="Good Morning"}
    break;
    case time>=12 && time<18 : {greeting="Good Afternoon"}
    break;
    case time>=18 && time<21 : {greeting="Good Evening"}
    break;
    case time>=21 && time<0 : {greeting="Good Night"}
    break;
  }
//lerawa ✨
  function buttonHandler(){

    fetch("http://localhost:3000/sendOtp", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name:name, email:email, password:password}),
      credentials: 'include'
    })
    .then(response => response.json()) // return the result of response.json()
    .then(result => {
      console.log(result);
      if(result.valid){
        return nav("/otp")
      }
      else{
        console.log("the user has not been created successfully");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  
  }

  return (
    <>
  <NavLink to={"/"} >home</NavLink>

    <div className={style.signUpContainer}>
        <h1>{greeting}!</h1>
        <p style={{color:" rgb(72, 72, 72)", fontSize:"14.5px"}}>Welcome to our community, letr create your account!</p>
      <br />
      
        <div className={style.error}>
           {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>  


      <div className={style.signUpInputs}>
        <div className={style.name}>
          <label htmlFor="text">Name</label>
          <input value={name} onChange={(e)=>{setName(e.target.value)}} required type="text" />
        </div>

        <div className={style.email}>
          <label htmlFor="email">Email Address</label>
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required type="email" />
        </div>

        <div className={style.pass}>
          <label htmlFor="password">Password</label>
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type="password" />
        </div>
      </div>

      <br />
      <br />

      <div className={style.signUpButton}>
        <button onClick={buttonHandler}>Sign up</button>
      </div>


      <p>already have an account? <span><NavLink to={"/login"} >Sign in</NavLink></span></p>
<hr />

      <p>or sign up whith</p>
      <div className={style.signUpWith}>
        <NavLink style={{textDecoration:"none"}} to="#">
        <div className={style.ggl}>
            <img src={ggl} alt="" />
            <p>Continue With Google</p>
        </div>
        </NavLink>

        <NavLink style={{textDecoration:"none"}} to="#">
        <div className={style.fb}>
            <img src={fb} alt="" />
            <p>Continue With Facebook</p>
        </div>
        </NavLink>
        
      </div>
    </div>

    <div style={{position:'absolute', top:"670px", left:"580px"}}>
      {error && <h1 style={{ color: 'red' }}>{error}</h1>}
    </div>

   </>
  )
}


export default SignUp
