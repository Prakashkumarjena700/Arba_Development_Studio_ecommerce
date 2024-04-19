import React, { useState } from 'react';
import { PiShoppingCartFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'))
    const cart = JSON.parse(localStorage.getItem('cart'))

    const navigate = useNavigate()

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const logOut = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className='flex justify-between p-4 sticky top-0 z-50 bg-white'>
            <div onClick={() => navigate('/')} className='cursor-pointer font-bold ' ><h2 className='text-[30px] text-[#00AAC3]' >ShopeZ</h2></div>
            <div className='relative'>
                <div className='flex items-center'

                >
                    <div className='flex cursor-pointer' onClick={() => navigate('/cart')} >
                        <PiShoppingCartFill className='text-[30px]' />
                        <p className='border absolute bottom-6 left-5 px-1.5 rounded-full' >{cart?.length}</p>
                    </div>
                    <button onClick={toggleDropdown} className='ml-4 w-10'><img src={user?.avatar} alt="" /></button>
                </div>
                {showDropdown && (
                    <div onClick={() => setShowDropdown(false)} className='absolute w-[150px] text-left right-2 mt-2 p-2 bg-white rounded shadow-lg z-50'>
                        <ul>
                            <li><Link to='/my-store' className=' block cursor-pointer'>My Store</Link></li>
                            <li> <Link to='/profile' className='block cursor-pointer'>Profile</Link></li>
                            <li><p className=' cursor-pointer' onClick={logOut} >Logout</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
