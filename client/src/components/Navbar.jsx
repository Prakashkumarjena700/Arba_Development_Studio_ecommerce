import React, { useState } from 'react';
import { PiShoppingCartFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addingCartCount } from '../redux/Products/productsActions';
export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch();

    const cartVal = useSelector(state => state.products.cartCount);


    const navigate = useNavigate()

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const logOut = () => {
        dispatch(addingCartCount(0));
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        localStorage.removeItem('hasAcceptedTerms')
        navigate('/login')
    }

    return (
        <nav className='flex justify-between p-4 sticky top-0 z-50 bg-white'>
            <div onClick={() => navigate('/')} className='cursor-pointer font-bold z-50 ' ><h2 className='text-[30px] text-[#00AAC3]' >ShopeZ</h2></div>
            <div className='relative'>
                <div className='flex items-center gap-4 '

                >
                    <div className='flex cursor-pointer' onClick={() => navigate('/cart')} >
                        <PiShoppingCartFill className='text-[30px] text-[#00AAC3]' />
                        <p className='border absolute bottom-6 left-5 px-1.5 rounded-full bg-green-500 text-white' >{cartVal}</p>
                    </div>
                    <button onClick={toggleDropdown} className='ml-4 w-10 border rounded-full'><img className='rounded-full' src={user?.avatar} alt="" /></button>
                </div>
                {showDropdown && (
                    <div onClick={() => setShowDropdown(false)} className='absolute w-[150px] text-left right-2 mt-2 p-2 bg-white rounded border shadow-inner z-50'>
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
