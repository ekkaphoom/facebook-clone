import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { db } from '../firebase';
import firebase from 'firebase';
const InputBox = () => {
  const [session] = useSession();
  const inputRef = useRef('');
  const filePickerRef = useRef(null);
  const [imageToPose, setImagePost] = useState(null);
  const sendPost = e => {
    e.preventDefault();

    if (!inputRef.current.value) return;
    const message = inputRef.current.value;
    const { name, email, image } = session.user;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    db.collection('posts').add({
      message,
      name,
      email,
      image,
      timestamp
    });
    inputRef.current.value = '';
  };
  const addPhotoToPost = (e) => {

  };
  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image className='rounded-full'
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed' />
        <form className='flex flex-1' onSubmit={sendPost}>
          <input ref={inputRef} type='text' placeholder={`What's on your mind ${session.user.name}`}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none' />
          <button type='submit' hidden >Submit</button>
        </form>
      </div>
      <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-xs sm:text-sm'>Live Video</p>
        </div>
        <div className='inputIcon' onClick={() => filePickerRef.current.click()}>
          <CameraIcon className='h-7 text-green-400' />
          <p className='text-xs sm:text-sm'>Photo/Video</p>
          <input ref={filePickerRef} type='file' hidden onChange={addPhotoToPost} />
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-500' />
          <p className='text-xs sm:text-sm'>Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
