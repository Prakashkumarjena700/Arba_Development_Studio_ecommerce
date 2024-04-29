import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/Auth/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { HiEyeOff, HiEye } from "react-icons/hi";
import loginBg from '../assets/signup_login_bg.png'
import { ImSpinner2 } from "react-icons/im";

export default function Signup() {
  const [userName, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  const isLoading = useSelector(state => state.auth.loading);
  const msg = useSelector(state => state.auth.msg);
  const error = useSelector(state => state.auth.error);
  const isRegister = useSelector(state => state.auth.isRegister);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUp = () => {
    if (userName == '' || fullName == '' || email == '' || password == '' || confPassword == '') {
      alert('Please fill all the fields')
    } else if (password !== confPassword) {
      alert('Password and confirm password should be same')
    } else {
      let avatar = "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png";
      dispatch(register(userName, fullName, email, password, avatar))
    }
  }

  useEffect(() => {
    if (isRegister && !isLoading) {
      alert('Register successfully')
      navigate('/login')
    }
    else if (error?.msg == 'Already have an account please login') {
      alert('Already have an account please login')
      navigate('/login')
    }
    else if (!isRegister && error) {
      alert("Something went wrong")
    }

  }, [isLoading, isRegister])

  return (
    <div className='grid gap-8 grid-cols-2' >
      <div >
        <img src={loginBg} alt="" className='w-full h-[99.9vh]' />
      </div>
      <div className='flex justify-center items-center' >
        <div className='w-[60%]' >
          <div className=' flex justify-center items-center flex-col ' >
            <div className='border h-16 w-16 bg-[#00AAC3] rounded-full' ></div>
            <h2 className='font-bold text-lg' >ShopeZ</h2>
            <p>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.</p>
          </div>
          <div>
            <input
              className='outline-none border-b-2 w-full border-[#00AAC3] mt-4'
              type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <input
              className='outline-none border-b-2 w-full border-[#00AAC3] mt-4'
              type="text" placeholder='Fullname' onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <input
              className='outline-none border-b-2 w-full border-[#00AAC3] mt-4'
              type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>


          <div className='flex my-2 mt-4 border-b-2 border-[#00AAC3] ' >
            <input
              className='outline-none w-[91%]'
              type={showPassword ? 'text' : 'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button className='text-[#00AAC3]' onClick={() => setShowPassword(!showPassword)} >{showPassword ? <HiEye /> : <HiEyeOff />}</button>
          </div>

          <div className='flex my-2 mt-4 border-b-2 border-[#00AAC3] ' >
            <input
              className='outline-none w-[91%]'
              type={showConfPassword ? 'text' : 'password'} placeholder='Confirm password' onChange={(e) => setConfPassword(e.target.value)} />
            <button className='text-[#00AAC3]' onClick={() => setShowConfPassword(!showConfPassword)} >{showConfPassword ? <HiEye /> : <HiEyeOff />}</button>
          </div>



          <button
            className='bg-[#00AAC3] text-white w-full rounded-lg py-1 mt-6 flex justify-center items-center h-10'
            onClick={signUp} >
            {isLoading ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Register</span>}

          </button>
          <p className='mt-3' >Already have an account ? <Link to="/login" className='text-[#00AAC3]' >Login</Link></p>
        </div>
      </div>

    </div>
  )
}
