import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {


  return (
    <div>
      <NavLink className="home" to={"/login"}>Log in</NavLink>
    </div>
  )
}

export default Home
