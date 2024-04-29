import React, { useState, useRef } from 'react';
import { ImSpinner2 } from "react-icons/im";
import TermsAndCondition from '../components/TermsAndCondition';
import { HiEyeOff, HiEye } from "react-icons/hi";
import Navbar from '../components/Navbar';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false)
  const [fullNameModal, setFullNameModal] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [fullName, setFullname] = useState(user.fullName)
  const [password, setPassword] = useState(user.password)
  const [updateLoader, setUpdateLoader] = useState(false)
  const [showTandC, setShowTandC] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
      let avatar = data.url;
      await fetch(`${baseUrl}/users/edit/${user._id}`, {
        method: "PATCH",
        body: JSON.stringify({ "avatar": avatar }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).then(res => res.json())
        .then(res => {
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
        })
        .catch(err => console.log(err))

      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert('Something went wrong');
      console.error('Error uploading image:', error);
    }
  };


  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const updateUserData = async () => {
    setUpdateLoader(true)

    let payload = {
      fullName,
      password
    }

    await fetch(`${baseUrl}/users/edit/${user._id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(res => {
        if (res.success) {
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
          alert('User data has been updated')
        }

        setFullNameModal(false)
        setPasswordModal(false)
        setUpdateLoader(false)

      })
      .catch(err => {
        alert('Something went wrong')
        console.log(err)
        setFullNameModal(false)
        setPasswordModal(false)
        setUpdateLoader(false)
      })
  }

  return (
    <div>
      <Navbar />

      <div className='flex justify-center items-center flex-col'>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
          <img src={user?.avatar} alt=""
            className={`border w-28 rounded-full ${loading ? 'bg-black opacity-10' : ''}`}
            onClick={handleImageClick} style={{ cursor: 'pointer' }} />
          <button className=' w-28 flex justify-center relative bottom-20 text-[30px] text-[#00AAC3]' >{loading && <span className='animate-spin' ><ImSpinner2 /></span>}</button>
        </div>
        <div>
          <p>{user?.userName}</p>
          <p>{user?.email}</p>
          <p>Full Name: {user?.fullName}</p>
          <button
            onClick={() => {
              setFullNameModal(true)
              setPasswordModal(false)
            }}
            className='bg-[#00AAC3] text-white px-2 py-0.5 mt-2'
          >Update Profile</button>
        </div>
        <div className='flex gap-10 mt-10' >
          <button
            onClick={() => {
              localStorage.removeItem('hasAcceptedTerms')
              setShowTandC(true)
            }}
            className='bg-[#00AAC3] text-white px-2 py-0.5 mt-2'
          >See T & C</button>
          <button
            onClick={() => {
              setFullNameModal(false)
              setPasswordModal(true)
            }}
            className='bg-[#00AAC3] text-white px-2 py-0.5 mt-2'
          >Change Password</button>
        </div>
      </div>

      {
        showTandC && <TermsAndCondition />
      }


      {
        fullNameModal || passwordModal ?

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 ">
              {fullNameModal && (
                <div>
                  <h2>Update fullname</h2>
                  <input
                    type="text"
                    defaultValue={user.fullName}
                    placeholder="Enter new full name"
                    className="outline-none border-b-2 w-full border-[#00AAC3] my-6 "
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
              )}
              {passwordModal && (
                <div>
                  <p>Update password</p>
                  <div className='flex my-2 mt-6 border-b-2 border-[#00AAC3] ' >
                    <input
                      type="text"
                      placeholder="Enter new password"
                      className="outline-none w-[91%]"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      className='text-[#00AAC3]'
                      onClick={() => setShowPassword(!showPassword)} >{showPassword ? <HiEye /> : <HiEyeOff />}</button>
                  </div>
                </div>


              )}
              <div className="flex justify-center">
                <button
                  className="mr-2 px-4 py-0.5 text-white bg-[#00AAC3] rounded "
                  onClick={() => {
                    setFullNameModal(false);
                    setPasswordModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-0.5 text-white bg-[#00AAC3] rounded flex justify-center items-center h-10 "
                  onClick={updateUserData}
                >
                  {updateLoader ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Update</span>}

                </button>
              </div>
            </div>
          </div> : ''
      }


    </div>
  );
};

export default Profile;

