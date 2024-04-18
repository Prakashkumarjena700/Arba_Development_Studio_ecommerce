import React, { useState, useRef } from 'react';
import { ImSpinner2 } from "react-icons/im";

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false)

  const baseUrl = process.env.REACT_APP_BASE_URL;


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadPhoto(file);
  };

  const uploadPhoto = async (file) => {
    if (!file) {
      alert('Please select a photo.');
      return;
    }

    setLoading(true)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'manyavar');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drijzhqfp/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      console.log('Uploaded image URL:', data.url);

      setLoading(false)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const editUser = async (payload, id) => {
    await fetch(`${baseUrl}/user/edit/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }



  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className='flex justify-center items-center flex-col'>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
          <img src={user?.avatar} alt=""
            className={`border w-28 ${loading ? 'bg-black opacity-10' : ''}`}
            onClick={handleImageClick} style={{ cursor: 'pointer' }} />
          <button className=' w-28 flex justify-center relative bottom-20 text-[30px] text-[#00AAC3]' >{loading && <span className='animate-spin' ><ImSpinner2 /></span>}</button>
        </div>
        <div>
          <p>{user?.userName}</p>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

