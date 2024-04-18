import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/Auth/authActions';


export default function Login() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.auth.loading);

  console.log(isLoading);

  const Login = () => {
    dispatch(login(userName, password))
  }

  return (
    <div>
      <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={Login} >Login</button>
    </div>
  )
}
