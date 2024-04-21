import React, { useEffect, useState } from 'react'
import TermsAndCondition from '../components/TermsAndCondition'
import Carousel from '../components/Carousel'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts,addingCartCount } from '../redux/Products/productsActions';
import { Link } from 'react-router-dom'

export default function Home() {
  const products = useSelector(state => state.products.products.slice(0, 8));
  const dispatch = useDispatch();
  const [product, setProduct] = useState({})
  const [count, setCount] = useState(1)


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const AddtoCart = (ele) => {
    setProduct(ele)

    const existingProductIndex = cart.findIndex(item => item._id == ele._id);

    if (existingProductIndex == -1) {
      const newEle = { ...ele, qty: 1 };
      let newArray = [...cart, newEle]
      localStorage.setItem('cart', JSON.stringify(newArray))
      dispatch(addingCartCount(newArray.length));
    } else {
      let currentQty = cart[existingProductIndex];
      setCount(currentQty.qty)
    }

  }

  const decreaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cartItems.findIndex(item => item._id === id);

    if (index !== -1) {
      if (cartItems[index].qty > 1) {
        cartItems[index].qty -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setCount(count - 1)
    }
  };

  const increaseQty = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const index = cartItems.findIndex(item => item._id === id);

    if (index !== -1) {
      cartItems[index].qty += 1;
      localStorage.setItem('cart', JSON.stringify(cartItems));
      setCount(count + 1)
    }
  };


  return (
    <div>
      <TermsAndCondition />
      <Carousel />
      <div className='grid grid-cols-4 gap-10 p-4 mt-10' >
        {
          products && products.map((ele) =>
            <div key={ele._id} className='border' >
              <img className='w-full h-[70%]' src={ele.image} alt="" />
              <div className='border w-[80%] m-auto bg-white shadow-lg p-2 relative bottom-20 z-10 text-left' >
                <strong>{ele.title}</strong>
                <p className='h-14' >{ele.description}</p>
                <p className='text-[#00AAC3]' >Rs. {ele.price}</p>
                <div>
                  {product._id !== ele._id && <button onClick={() => AddtoCart(ele)} className='bg-[#00AAC3] text-white w-full py-1 mt-1' >Add to cart</button>}
                  {product._id == ele._id && <button className='bg-[#00AAC3] text-white w-full py-1 mt-1' ><span onClick={() => decreaseQty(ele._id)}  >-</span> {count} <span onClick={() => increaseQty(ele._id)} >+</span> </button>}
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div className='flex justify-end p-5' >
        <button className='bg-[#00AAC3] text-white px-5 py-2' ><Link to="/all-products" >{`All Products > > `}</Link></button>
      </div>
    </div>
  )
}
