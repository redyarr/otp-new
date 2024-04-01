import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AccountCreated = () => {
    const style={
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%, -50%)"
    }

    const navigator=useNavigate()

    useEffect(()=>{
        setTimeout(()=>{
            navigator(-3)
        }, 3000)
    }, [])

    
  return (
    <div>
      <h1 style={style}> hello  , your account was created succesfully</h1>

    </div>
  )
}

export default AccountCreated
