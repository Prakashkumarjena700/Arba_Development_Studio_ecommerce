import React, { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { addingCartCount } from '../redux/Products/productsActions';

export default function Cart() {
  const productsFromLS = JSON.parse(localStorage.getItem('cart')) || []
  const [products, setProducts] = useState(productsFromLS)
  const dispatch = useDispatch();

  const decreaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.findIndex(item => item._id === id);
    if (cartItems[index]?.qty == 1) {
      cartItems.splice(index, 1)
      dispatch(addingCartCount(cartItems.length));
      localStorage.setItem('cart', JSON.stringify(cartItems))
    } else if (cartItems[index].qty > 1) {
      cartItems[index].qty -= 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    setProducts(cartItems)
  };

  const increaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cartItems.findIndex(item => item._id === id);
    cartItems[index].qty = cartItems[index].qty + 1
    setProducts(cartItems)
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  return (
    <div>
      <Navbar />
      <div className='grid grid-cols-4 gap-20 p-10' >
        {
          products && products.map((ele) =>
            <div key={ele._id} className='h-[300px]' >
              <img className='w-full h-[70%]' src={ele.image} alt="" />
              <div className='border w-[85%] m-auto bg-white shadow-lg p-2 relative bottom-20 z-10 text-left' >
                <strong>{ele.title}</strong>
                <p className='h-14' > {ele.description.length > 50 ? `${ele.description.slice(0, 50)}...` : ele.description}</p>
                <p className='text-[#00AAC3]' >Rs. {ele.price}</p>
                <div>
                  <button className='bg-[#00AAC3] text-white w-full py-1 mt-1 flex items-center justify-evenly' ><span onClick={() => decreaseQty(ele._id)}  ><FaMinus /></span> {ele.qty} <span onClick={() => increaseQty(ele._id)} ><FaPlus /></span> </button>
                </div>
              </div>
            </div>
          )
        }

      </div>
      <div>
        {
          products == null || products.length == 0 ? <div>
            <p className='text-[#00AAC3] text-center font-semibold mb-4'>Empty Cart </p>
            <Link to="/all-products" className='bg-[#00AAC3] text-white py-1 px-3 rounded' >Add Product</Link>
          </div> : ''
        }
      </div>
    </div>
  )
}
