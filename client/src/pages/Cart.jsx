import React, { useState } from 'react'

export default function Cart() {
  const products = JSON.parse(localStorage.getItem('cart'))
  const [count, setCount] = useState(1)

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
      <div className='grid grid-cols-4 gap-10 p-4 mt-10' >
        {
          products && products.map((ele) =>
            <div key={ele._id} className='border' >
              <img className='w-full h-[70%]' src={ele.image} alt="" />
              <div className='border w-[80%] m-auto bg-white shadow-lg p-2 relative bottom-20 z-50 text-left' >
                <strong>{ele.title}</strong>
                <p className='h-14' >{ele.description}</p>
                <p className='text-[#00AAC3]' >Rs. {ele.price}</p>
                <div>
                  <button className='bg-[#00AAC3] text-white w-full py-1 mt-1' ><span onClick={() => decreaseQty(ele._id)}  >-</span> {ele.qty} <span onClick={() => increaseQty(ele._id)} >+</span> </button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
