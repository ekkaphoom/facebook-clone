import React from 'react'
import Stories from './Stories'
import InputBox from './InputBox'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className='flex-grow h-screen pb-44 pt-6 xl:mr-40 overflow-y-auto'>
      <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>
        {/* Story */}
        <Stories />
        {/* InputBox */}
        <InputBox />
        {/* Posts */}
        <Posts />
      </div>
    </div>
  )
}

export default Feed
