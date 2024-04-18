import React, { useState } from 'react';
import { PiShoppingCartFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);

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
        <nav className='flex justify-between p-4'>
            <div onClick={() => navigate('/')} className='cursor-pointer' >Logo</div>
            <div className='relative'>
                <div className='flex items-center'>
                    <div className='flex'>
                        <p>0</p>
                        <PiShoppingCartFill />
                    </div>
                    <button onClick={toggleDropdown} className='ml-4'>Profile</button>
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
