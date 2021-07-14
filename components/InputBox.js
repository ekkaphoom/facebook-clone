import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { db, storage } from '../firebase';
import firebase from 'firebase';
const InputBox = () => {
  const [session] = useSession();
  const inputRef = useRef('');
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
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
    }).then(doc => {
      console.log(doc.id);
      if (imageToPost) {
        const uploadTask = storage.ref(`/posts/${doc.id}`).putString(imageToPost, 'data_url');
        removeImage();

        uploadTask.on('state_change', null, error => console.error(err), () => {
          // When upload completes
          console.log('state_change', doc.id);
          storage.ref('posts').child(doc.id).getDownloadURL().then(url => {
            console.log('url', url);
            db.collection('posts').doc(doc.id).set({
              postImage: url
            }, {
              merge: true
            });
          });
        });

      }
    });
    inputRef.current.value = '';
  };

  const addPhotoToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = readerEvent => setImageToPost(readerEvent.target.result)
  };

  const removeImage = () => {
    setImageToPost(null);
  }

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image className='rounded-full'
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed' />
        <form className='flex flex-1'>
          <input ref={inputRef} type='text' placeholder={`What's on your mind ${session.user.name}`}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none' />
          <button type='submit' hidden onClick={sendPost} >Submit</button>
        </form>
        {
          imageToPost && (
            <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor:pointer'>
              <img src={imageToPost} className="h-10 object-contain" />
              <p className='text-xs text-red-500 text-center'>Remove</p>
            </div>
          )
        }
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
